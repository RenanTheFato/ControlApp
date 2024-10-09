import Fastify from 'fastify';
import cors from '@fastify/cors'
import { routes } from './routes';
import { automaticRemoveOtpExpired } from './auto/automaticRemoveOtpExpired';

const server = Fastify({  logger: true  });

const start = async() =>{

  automaticRemoveOtpExpired.execute();
  await server.register(cors);
  await server.register(routes);

  try {

    await server.listen({
      port: 3333,
      host: '0.0.0.0'
    })

  } catch (error) {
    console.log(`Erro ao iniciar servidor ${error}.`);
    process.exit(1);
  }
  
}

start();