import Firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

if(!Firebase.apps.length) {
  Firebase.initializeApp({
    apiKey: "AIzaSyBaWLSyTKs_VNWvP77p3IM8b8ZUFna_jWM",
    authDomain: "my-nuxttodo.firebaseapp.com",
    projectId: "my-nuxttodo",
    storageBucket: "my-nuxttodo.appspot.com",
    messagingSenderId: "939628155738",
    appId: "1:939628155738:web:68541bed9e27957c525963",
    measurementId: "G-TL6W3WRWD1"
  })
}

export default (context, inject) => {
  const $fb = {
    app: Firebase.app,
    auth: Firebase.auth,
    firestore: Firebase.firestore
  }
  inject ('fb', $fb)
}
