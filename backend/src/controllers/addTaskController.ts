import { FastifyRequest, FastifyReply  } from 'fastify'
import { randomUUID } from 'crypto';
import { connection } from '../database/connection';
import { addTaskService } from '../services/addTaskService';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export class addTaskController{
  async handle(req: FastifyRequest, res: FastifyReply){
    const { name, description, status, deadline, price } = req.body as { name: string, description: string, status: number, deadline: Date, price: number};

     //Generate 16 char id for user 
     let id = await randomUUID().replace(/-/g,'').slice(0,16);
        
     //Check that the id that was generated isn't in use by another user, although the chances are low using a UUID generator, 
     //but nothing is impossible and this would break the code :D
     const [UUID] = await connection.query(`SELECT COUNT(*) AS count FROM ${process.env.TABLE4} WHERE id = ?`, [id]);
     const UUID_Find = (UUID as any)[0].count;
 
     if(UUID_Find > 0){
       id = await randomUUID().replace(/-/g,'').slice(0,16);
     };

     const validateTask = z.object({
      name: z.string().min(2, { message: "The task name doesn't meet the minimum number of characters (2)." }),
      description: z.string().optional(),
      status: z.number().min(1, { message: "The status can only be set to a number between 1 and 3"}).max(3, { message: "The status can only be set to a number between 1 and 3" }),
      deadline: z.string().refine(value => !isNaN(new Date(value).getTime()), {
        message: "Invalid date format. Use YYYY-MM-DD."
      }),
      price: z.number().positive({ message: "The price has to be a positive value" })
     });

     try {
      validateTask.parse(req.body)
     } catch (error: any) {
      return res.status(400).send({error: error.errors});
     }

     const idUser = req.user.id as string;

     const AddTaskService = new addTaskService();

     try {
      await AddTaskService.execute({ id, name, description, status, deadline, price, idUser});
      return res.status(200).send({ message: "Task has been created." });
     } catch (error) {
      return res.status(500).send({ error: `Error on create task: ${error}.` });
     }

  }
}