import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const app = firebase.initializeApp({
  apiKey: 'AIzaSyAjJG6UrfA1FEzV8qbjmuk8wiUic0uWv-8',
  authDomain: 'finapp-17474.firebaseapp.com',
  databaseURL: 'https://finapp-17474.firebaseio.com',
  projectId: 'finapp-17474',
  storageBucket: 'finapp-17474.appspot.com',
  messagingSenderId: '1057184379213'
})

export const db = app.database()
