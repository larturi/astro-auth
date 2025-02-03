// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtdK8SNH12bmigHD0-zpyHDuHvTpsgcn4',
  authDomain: 'astro-auth-udemy.firebaseapp.com',
  projectId: 'astro-auth-udemy',
  storageBucket: 'astro-auth-udemy.firebasestorage.app',
  messagingSenderId: '827464083413',
  appId: '1:827464083413:web:566662fa17d4afd8e4bf5c'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

auth.languageCode = 'es'

export const firebase = { app, auth }
