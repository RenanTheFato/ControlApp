import {FastifyRequest, FastifyReply} from 'fastify';
import { connection } from '../database/connection';
import { randomUUID } from 'crypto';
import { z } from 'zod'
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export class userController{

  async createUser(req: FastifyRequest, res: FastifyReply){

    //Code for recive user informations on req.body as json
    const {username, email, password} = req.body as {username: string, email: string, password: string};

    //Generate 16 char id for user 
    let id = await randomUUID().replace(/-/g,'').slice(0,16);
        
    //Check that the id that was generated isn't in use by another user, although the chances are low using a UUID generator, 
    //but nothing is impossible and this would break the code :D
    const [UUID] = await connection.query(`SELECT COUNT(*) AS count FROM ${process.env.TABLE1} WHERE id = ?`, [id]);
    const UUID_Find = (UUID as any)[0].count;

    if(UUID_Find > 0){
      id = await randomUUID().replace(/-/g,'').slice(0,16);
    };

    //Zod field validation
    const validateUser = z.object({
      username: z.string().min(2, { message: "The username doesn't meet the minimum number of characters (2)."}),
      email: z.string().email({ message: "The value entered isn't an e-mail or the e-mail is invalid."}),
      password: z.string().min(8, { message: "The password doesn't meet the minimum number of characters (8)."})
    });

    try {
      validateUser.parse(req.body);
    } catch (error: any) {
      return res.status(400).send({error: error.erros});
    };
    
    //Check if the email is already in use by another user
    const [emails] = await connection.query(`SELECT COUNT(*) AS count FROM ${process.env.TABLE1} WHERE id = ?`, [id]);
    const emailFind = (emails as any)[0].count;

    if(emailFind > 0){
      res.status(400).send({error: "The email is already registered."});
    };

    //Generate an otp code for two-factor authentication, which provides more security and doesn't allow any e-mail for registration
    const generateOTPCreateAccount = otpGenerator.generate(6,{
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false
    });

    const formattedOtpForEmail = generateOTPCreateAccount.split('');

    const otpCreateAccountExpirationTime = new Date(Date.now() + 15 * 60 * 1000);

    let authCreateAccountTemplateEmail = fs.readFileSync(path.resolve(__dirname ,'.' , 'emails', '2fa.html'), 'utf-8');

    //Create model for 2FA email and send to user
    formattedOtpForEmail.forEach((otpDigit, index) =>{
      authCreateAccountTemplateEmail = authCreateAccountTemplateEmail.replace(`[n${index + 1}]`, otpDigit);
    });

    const emailContent = authCreateAccountTemplateEmail
    .replace('[nome]', username)
    .replace('[ano]', new Date().getFullYear().toString()
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
      },
      tls:{
        rejectUnauthorized: false
      }
    });

      const configEmail = {
        from: process.env.NODEMAILER_EMAIL,
        to:  process.env.NODEMAILER_EMAIL,
        subject: "test",
        html: emailContent
      }

      try {
        const sent = await transporter.sendMail(configEmail);
        console.log('Email has sent. ',sent.messageId);
      } catch (error) {
        console.log('Error on send email. ', error);
      }

      await connection.query(`INSERT INTO ${process.env.TABLE2} (email, otp_code, expires_at) VALUES (?,?,?)`,
      [email, generateOTPCreateAccount, otpCreateAccountExpirationTime]
      );

    const hashPassword = await bcrypt.hash(password, 10);

  }

  async loginUser(req: FastifyRequest, res: FastifyReply){

  }

}