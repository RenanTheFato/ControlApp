import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from 'fastify';
import {userController} from './controllers/userController'
import { verifyOtpController } from './controllers/verifyOtpController';
import dotenv from 'dotenv';

dotenv.config();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

  fastify.post('/singup', async(req: FastifyRequest, res: FastifyReply) => {
    return new userController().createUser(req, res);
  });

  fastify.post('/singup-verify', async(req: FastifyRequest, res: FastifyReply) => {
    return new verifyOtpController().verifyUserOtp(req, res);
  });
}