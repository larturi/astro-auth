import type { MiddlewareNext } from 'astro'
import { firebase } from './firebase/config'

const privateRoutes = ['/protected']
const publicRoutes = ['/login', '/register']

export const onRequest = async (
  { redirect, request, url, locals }: any,
  next: any
) => {
  if (privateRoutes.includes(url.pathname)) {
    const authHeader = request.headers.get('authorization')
  }

  const isLoggedIn = !!firebase.auth.currentUser
  const user = firebase.auth.currentUser

  if (user) {
    locals.user = {
      email: user.email,
      name: user.displayName,
      avatar: user.photoURL,
      emailVerified: user.emailVerified
    }
  }

  locals.isLoggedIn = isLoggedIn

  // El usuario no esta logueado y esta intentando acceder a una ruta privada
  if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect('/login')
  }

  // El usuario esta logueado y esta intentando acceder a una ruta publica
  if (isLoggedIn && publicRoutes.includes(url.pathname)) {
    return redirect('/')
  }

  return next()
}
