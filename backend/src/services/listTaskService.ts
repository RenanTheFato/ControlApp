import { connection } from "../database/connection";
import dotenv from 'dotenv';

dotenv.config();

interface listProps{
  idUser: string
}

export class listTaskService{
  async execute({idUser}: listProps){

    const [tasks] = await connection.query(`SELECT * FROM ${process.env.TABLE4} WHERE user = ? ORDER BY name`,[idUser]);

    return tasks;
  }
}