import type { MiddlewareNext } from 'astro'

const privateRoutes = ['/protected']

export const onRequest = async (context: any, next: any) => {
  if (privateRoutes.includes(context.url.pathname)) {
    const authHeader = context.request.headers.get('authorization')
    return checkLocalAuth(authHeader, next)
  }

  return next()
}

const checkLocalAuth = (authHeader: string | null, next: MiddlewareNext) => {
  if (!authHeader) {
    return notAutorized()
  }

  try {
    const [scheme, encoded] = authHeader.split(' ')

    if (!encoded || scheme !== 'Basic') {
      throw new Error('Invalid authentication format')
    }

    const decoded = atob(encoded)
    const [username, password] = decoded.split(':')

    if (username === 'admin' && password === 'admin') {
      return next()
    }

    return notAutorized()
  } catch {
    return notAutorized()
  }
}

const notAutorized = () => {
  return new Response('Authentication failed', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  })
}
