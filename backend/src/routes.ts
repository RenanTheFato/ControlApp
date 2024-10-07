import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from 'fastify';
import {userController} from './controllers/userController'
import { verifyOtpController } from './controllers/verifyOtpController';
import { AuthUserController } from './controllers/authUserController';
import { authUserMiddleware } from './middlewares/userMiddleware';
import dotenv from 'dotenv';

dotenv.config();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

  fastify.post('/singup', async(req: FastifyRequest, res: FastifyReply) => {
    return new userController().handle(req, res);
  });

  fastify.post('/singup-verify', async(req: FastifyRequest, res: FastifyReply) => {
    return new verifyOtpController().handle(req, res);
  });

  fastify.post('/singin', async(req: FastifyRequest, res: FastifyReply) => {
    return new AuthUserController().handle(req, res);
  });

  fastify.get('/logged', { preHandler: authUserMiddleware }, async(req: FastifyRequest, res: FastifyReply) => {
    return res.send({id: 1, content: "test middleware"});
  });
}