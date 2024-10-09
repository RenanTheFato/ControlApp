import { FastifyRequest, FastifyReply  } from 'fastify'
import { authUserService } from '../services/authUserService'

export class authUserController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const {email, password} = req.body as {email: string, password: string};

    const AuthUserService = new authUserService();

    try {
      const user = await AuthUserService.execute({email, password});
      res.status(200).send({user})
    } catch (error) {
      res.status(401).send({ error: "Unathorized" });
      throw error;
    }
  }
}