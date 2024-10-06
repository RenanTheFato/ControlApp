import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

  fastify.get('/teste', async(req: FastifyRequest, res: FastifyReply) => {
  })
}