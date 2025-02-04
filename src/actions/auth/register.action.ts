import { firebase } from '@/firebase/config'
import { z } from 'astro/zod'
import { defineAction } from 'astro:actions'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError
} from 'firebase/auth'

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional()
  }),
  async handler({ name, email, password, remember_me }, { cookies }) {
    // Cookies are set in the browser
    if (remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
        path: '/'
      })
    } else {
      cookies.delete('email', {
        path: '/'
      })
    }

    // Firebase create user logic
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password)

      if (!firebase.auth.currentUser) {
        throw new Error('Error creating user in Firebase')
      }

      // Actualizar el nombre del usuario
      await updateProfile(firebase.auth.currentUser, {
        displayName: name
      })

      // Enviar correo de verificación
      await sendEmailVerification(firebase.auth.currentUser, {
        url: 'http://localhost:4321/protected?emailVerified=true'
      })

      return { ok: true, message: 'User registered' }
    } catch (error) {
      const firebaseError = error as AuthError

      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new Error('Email already in use')
      }
      throw new Error('Error creating user in Firebase')
    }
  }
})
