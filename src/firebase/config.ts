// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_API_KEY,
  authDomain: import.meta.env.PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

auth.languageCode = 'es'

export const firebase = { app, auth }
