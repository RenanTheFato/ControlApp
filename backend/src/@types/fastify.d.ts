import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user: Partial<{
      id: number,
      username: string,
      email: string,
      password: string,
    }>
  }
}