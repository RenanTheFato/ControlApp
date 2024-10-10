import {connection} from '../database/connection';
import dotenv from 'dotenv';

dotenv.config();

interface insertUserProps{
  id: string,
  username: string,
  email: string,
  password: string,
}

//Entering the check controller data in the real user table
export class verifyOtpService{
  async execute({id, username, email, password}: insertUserProps){
    try {
      const [result] = await connection.query(
        `INSERT INTO ${process.env.TABLE1} (id, username, email, password) VALUES (?, ?, ?, ?)`,
        [id, username, email, password]
      );
      await connection.query(`DELETE FROM ${process.env.TABLE2} WHERE email = ?`, [email]);

      console.log(result);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}