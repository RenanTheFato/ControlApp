import { FastifyReply, FastifyRequest } from "fastify";
import { listTaskService } from "../services/listTaskService";

export class listTaskController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const idUser = req.user.id as string;

    const ListTaskService = new listTaskService();

    try {
      const tasks = await ListTaskService.execute({idUser});
      return res.status(200).send(tasks)
    } catch (error) {
      return res.status(200).send({ message: `Error on list tasks: ${error}.` })
    }

  }
}