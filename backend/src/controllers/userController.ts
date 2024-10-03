import {FastifyRequest, FastifyReply} from 'fastify';
import bcrypt from 'bcryptjs';
import { connection } from '../database/connection';
import { randomUUID } from 'crypto';
import { z } from 'zod'

export class userController{

  async createUser(req: FastifyRequest, res: FastifyReply){
    const {username, email, password} = req.body as {username: string, email: string, password: string};

    let id = await randomUUID().replace(/-/g,'').slice(0,16);
        
    const [UUID] = await connection.query(`SELECT COUNT(*) AS count FROM user WHERE id = ?`, [id]);
    const UUID_Find = (UUID as any)[0].count;

    if(UUID_Find > 0){
      id = await randomUUID().replace(/-/g,'').slice(0,16);
    };

    
    const validateUser = z.object({
      username: z.string().min(2, { message: "The username doesn't meet the minimum number of characters (2)."}),
      email: z.string().email({ message: "The value entered isn't an e-mail or the e-mail is invalid."}),
      password: z.string().min(8, { message: "The password doesn't meet the minimum number of characters (8)."})
    });
    
    const [emails] = await connection.query(`SELECT COUNT(*) AS count FROM user WHERE id = ?`, [id]);
    const emailFind = (emails as any)[0].count;

    if(emailFind > 0){
      res.status(400).send({error: "The email is already registered."});
    };

    const hashPassword = await bcrypt.hash(password, 10);

  }

  async loginUser(req: FastifyRequest, res: FastifyReply){

  }

}