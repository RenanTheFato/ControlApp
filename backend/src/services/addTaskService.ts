import { connection } from "../database/connection";
import dotenv from 'dotenv';

dotenv.config();

interface tasksProps{
  id: string,
  name: string,
  description: string,
  status: number,
  deadline: Date,
  price: number,
  recipient: string,
  idUser: string
}

export class addTaskService{
  async execute({ id, name, description, status, deadline, price, recipient ,idUser }: tasksProps){

    try {
      const [result] = await connection.query(`INSERT INTO ${process.env.TABLE4} (id, name, description, status, deadline, price, recipient, user)
      VALUES (?,?,?,?,?,?,?,?)`, [id, name, description, status, deadline, price, recipient, idUser]);

      console.log(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}