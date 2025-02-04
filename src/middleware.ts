import type { MiddlewareNext } from 'astro'

const privateRoutes = ['/protected']

export const onRequest = async (context: any, next: any) => {
  if (privateRoutes.includes(context.url.pathname)) {
    const authHeader = context.request.headers.get('authorization')
  }

  return next()
}
