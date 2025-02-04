import { firebase } from '@/firebase/config'
import { z } from 'astro/zod'
import { defineAction } from 'astro:actions'
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword
} from 'firebase/auth'

export const loginGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  async handler(credentials: any) {
    const credential = GoogleAuthProvider.credentialFromResult(credentials)

    if (!credential) {
      throw new Error('Error creating Google credential')
    }

    await signInWithCredential(firebase.auth, credential)

    return { ok: true, message: 'User logged in' }
  }
})
