import { connection } from "../database/connection";
import dotenv from 'dotenv';

dotenv.config();

interface listProps{
  idUser: string
}

export class listWarnService{
  async execute({idUser}: listProps){

    const [warns] = await connection.query(`SELECT * FROM ${process.env.TABLE5} WHERE user = ? ORDER BY title`,[idUser]);

    return warns;
  }
}