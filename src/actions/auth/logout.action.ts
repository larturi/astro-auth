import { firebase } from '@/firebase/config'
import { defineAction } from 'astro:actions'
import { signOut } from 'firebase/auth'

export const logoutUser = defineAction({
  accept: 'json',
  async handler() {
    // Firebase logout logic
    try {
      return await signOut(firebase.auth)
    } catch (error) {
      throw new Error('Error logging out user in Firebase')
    }
  }
})
