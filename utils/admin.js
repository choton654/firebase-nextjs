const admin = require('firebase-admin');
const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyC9TBIQfkdrrdYjADBn5eJWQMM8HWw_KP4',
  authDomain: 'nextonfirebase-a2055.firebaseapp.com',
  databaseURL: 'https://nextonfirebase-a2055.firebaseio.com',
  projectId: 'nextonfirebase-a2055',
  storageBucket: 'nextonfirebase-a2055.appspot.com',
  messagingSenderId: '71649665594',
  appId: '1:71649665594:web:7e82b76ca5e9c87defcb03',
  measurementId: 'G-3FZE7GXXB7',
};

firebase.initializeApp(config);

const serviceAccount = require('../nextonfirebase-a2055-firebase-adminsdk-rdjkt-5aeef312ef.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = firebase.auth();

module.exports = { admin, db, auth };
