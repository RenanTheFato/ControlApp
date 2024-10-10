import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from 'fastify';
import {userController} from './controllers/userController'
import { verifyOtpController } from './controllers/verifyOtpController';
import { authUserController } from './controllers/authUserController';
import { authUserMiddleware } from './middlewares/userMiddleware';
import dotenv from 'dotenv';
import { refreshTokenUserController } from './controllers/refreshTokenUserController';
import { addTaskController } from './controllers/addTaskController';

dotenv.config();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

  fastify.post('/singup', async(req: FastifyRequest, res: FastifyReply) => {
    return new userController().handle(req, res);
  });

  fastify.post('/singup-verify', async(req: FastifyRequest, res: FastifyReply) => {
    return new verifyOtpController().handle(req, res);
  });

  fastify.post('/singin', async(req: FastifyRequest, res: FastifyReply) => {
    return new authUserController().handle(req, res);
  });

  fastify.post('/refresh-token', async(req: FastifyRequest, res: FastifyReply) => {
    return new refreshTokenUserController().handle(req, res);
  });

  fastify.post('/add-task', { preHandler: authUserMiddleware }, async(req: FastifyRequest, res: FastifyReply) => {
    return new addTaskController().handle(req,res);
  });
}