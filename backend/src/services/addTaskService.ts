import { connection } from "../database/connection";
import dotenv from 'dotenv';

//Test

dotenv.config();

interface tasksProps{
  id: string,
  name: string,
  description: string,
  status: number,
  deadline: Date,
  price: number,
  idUser: string
}

export class addTaskService{
  async execute({ id, name, description, status, deadline, price, idUser }: tasksProps){

    try {
      const [result] = await connection.query(`INSERT INTO ${process.env.TABLE4} (id, name, description, status, deadline, price, user)
      VALUES (?,?,?,?,?,?,?)`, [id, name, description, status, deadline, price, idUser]);

      console.log(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}