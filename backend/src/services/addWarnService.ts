import { connection } from "../database/connection";
import dotenv from 'dotenv';

dotenv.config();

interface warnProps{
  id: string,
  title: string,
  subject: string,
  idUser: string
}

export class addWarnService{
  async execute({id, title, subject, idUser}: warnProps){

    try {
      const [result] = await connection.query(`INSERT INTO ${process.env.TABLE5} (id, title, subject, user) VALUES (?,?,?,?)`,
        [id, title, subject, idUser]
      );
      console.log(result);
    } catch (error) {
      console.log(error)
      throw new Error;
    }

  }
}