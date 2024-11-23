import { FastifyReply, FastifyRequest } from "fastify";
import { listWarnService } from "../services/listWarnService";

export class listWarnController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const idUser = req.user.id as string;

    const ListWarnService = new listWarnService();

    try {
      const tasks = await ListWarnService.execute({idUser});
      return res.status(200).send(tasks)
    } catch (error) {
      return res.status(200).send({ message: `Error on list tasks: ${error}.` })
    }

  }
}