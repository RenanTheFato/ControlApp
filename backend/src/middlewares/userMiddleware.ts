import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify'
import { connection } from '../database/connection'
import jwt from 'jsonwebtoken'
import 'dotenv'

type JwtPayLoad = {
  id: number
}

const authUserMiddleware =
  async (req: FastifyRequest, res: FastifyReply, done: HookHandlerDoneFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ error: 'Token is missing!' });
    }

    const token = authorization.split(' ')[1];

    try {
      const { id } = jwt.verify(token, process.env.JWTPASS ?? '') as JwtPayLoad;

      const [verifyId] = await connection.query(`SELECT * FROM ${process.env.TABLE1} WHERE id = ?`, [id]);
      const verifyUser = (verifyId as any)[0];

      const { password: _, ...userLogged } = verifyUser;

      req.user = userLogged;

      done();

    } catch (error) {
      return res.status(401).send({ error: 'Token is invalid!' });
    }

  }

export { authUserMiddleware }