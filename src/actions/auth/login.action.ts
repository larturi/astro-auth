import { firebase } from '@/firebase/config'
import { z } from 'astro/zod'
import { defineAction } from 'astro:actions'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const loginUser = defineAction({
  accept: 'form',
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional()
  }),
  async handler({ email, password, remember_me }, { cookies }) {
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

    // Firebase logout logic
    try {
      return JSON.stringify(
        await signInWithEmailAndPassword(firebase.auth, email, password)
      )
    } catch (error) {
      throw new Error('Error logging in user in Firebase')
    }
  }
})
