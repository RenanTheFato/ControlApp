import { FastifyReply, FastifyRequest } from "fastify";
import { refreshTokenUserService } from "../services/refreshTokenUserService";

export class refreshTokenUserController{
  async handle(req: FastifyRequest, res: FastifyReply){

    //Token request is passed on to the user RefreshToken service
    const { refresh_token } = req.body as { refresh_token: string };

    const RefreshTokenUserService = new refreshTokenUserService();

    const token = await RefreshTokenUserService.execute(refresh_token);

    return res.send(token);
  }
}