import {FastifyRequest, FastifyReply} from 'fastify';
import { verifyOtpService } from '../services/verifyOtpService';
import { connection } from '../database/connection';
import dotenv from 'dotenv';

dotenv.config();

export class verifyOtpController{
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { email, otp_code } = req.body as { email: string, otp_code: string };

    //Search the OTP code
    const [otpResult] = await connection.query(
      `SELECT * FROM ${process.env.TABLE2} WHERE email = ?`,
      [email]
    );

    const otpRecord = (otpResult as any)[0];

    if (!otpRecord) {
      return res.status(400).send({ error: "No OTP found for this email." });
    }

    //Verify if the code expired
    const currentTime = new Date();
    if (otpRecord.expires_at < currentTime) {
      await connection.query(
        `DELETE FROM ${process.env.TABLE2} WHERE email = ?`,
        [email]
      );
      return res.status(400).send({ error: "OTP has expired." });
    }

    // Verify if the code is correct
    if (otpRecord.otp_code !== otp_code) {
      return res.status(400).send({ error: "Invalid OTP." });
    }

    //Retrieving information from the temporary table to insert it into the definitive table
    const id = otpRecord.id_user;
    const password = otpRecord.password;
    const username = otpRecord.username;

    //Calling the service that will insert it into the final table, which will be used for logins and so on, to prevent false or unverified emails.
    const VerifyOtpService = new verifyOtpService();

    try {
      const insertUser = await VerifyOtpService.execute({id, username ,email, password});
      return res.status(201).send({ message: "User verified and created successfully." });
    } catch (error) {
      return res.status(500).send({error: 'Error on create user.'});
    }

  }
}