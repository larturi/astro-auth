import type { MiddlewareNext } from 'astro'
import { firebase } from './firebase/config'

const privateRoutes = ['/protected']

export const onRequest = async (context: any, next: any) => {
  if (privateRoutes.includes(context.url.pathname)) {
    const authHeader = context.request.headers.get('authorization')
  }

  const isLoggedIn = !!firebase.auth.currentUser
  const user = firebase.auth.currentUser

  if (user) {
    context.locals.user = {
      email: user.email,
      name: user.displayName,
      avatar: user.photoURL,
      emailVerified: user.emailVerified
    }
  }

  context.locals.isLoggedIn = isLoggedIn

  return next()
}
