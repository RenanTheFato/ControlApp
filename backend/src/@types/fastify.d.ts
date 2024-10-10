import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user: Partial<{
      id: string,
      username: string,
      email: string,
      password: string,
    }>
  }
}