import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from 'fastify';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions){

  fastify.get('/teste', async(req: FastifyRequest, res: FastifyReply) => {
    return {teste: true};
  })
}