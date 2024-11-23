import { FastifyReply, FastifyRequest } from "fastify";
import { randomUUID } from 'crypto';
import { connection } from '../database/connection';
import { z } from "zod";
import { addWarnService } from "../services/addWarnService";
import dotenv from 'dotenv';

dotenv.config();

export class addWarnController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const { title, subject } = req.body as { title: string, subject: string };
    const idUser = req.user.id as string;

    let id = await randomUUID().replace(/-/g,'').slice(0,16);

    const [UUID] = await connection.query(`SELECT COUNT(*) AS count FROM ${process.env.TABLE4} WHERE id = ?`, [id]);
    const UUID_Find = (UUID as any)[0].count;

    if(UUID_Find > 0){
      id = randomUUID().replace(/-/g,'').slice(0,16);
    };

    const validateWarn = z.object({
      title: z.string().min(2, ({ message: "The warn name doesn't meet the minimum number of characters (2)." })),
      subject: z.string().min(2, ({ message: "The =subject doesn't meet the minimum number of characters (2)." })).optional()
    });


    try {
      validateWarn.parse(req.body);
     } catch (error: any) {
      return res.status(400).send({error: error.errors});
     };

     const AddWarnService = new addWarnService();

     try {
      await AddWarnService.execute({ id, title, subject ,idUser});
      return res.status(200).send({ message: "Warn has been created." });
     } catch (error) {
      return res.status(500).send({ error: `Error on create warn: ${error}.` });
     }
  };
}