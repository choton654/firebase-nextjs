const auth = require('../utils/admin');
const firebase = require('firebase');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const isLength = require('validator/lib/isLength');
const isEmpty = require('validator/lib/isEmpty');
const { db } = require('../utils/admin');

exports.signUp = (req, res) => {
  const { handle, email, password } = req.body;

  if (!isEmail(email)) {
    return res.status(404).json({ error: 'Email must be valid' });
  } else if (!isLength(password, { min: 6, max: 12 })) {
    return res
      .status(404)
      .json({ error: 'Password must be 6 to 12 letters long' });
  } else if (isEmpty(handle.trim())) {
    return res.status(400).json({ msg: 'handle must not be empty' });
  }
  const newUser = {
    handle,
    email,
    password,
  };

  let userId, token;
  db.doc(`users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ msg: 'user already exists' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredntial = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`users/${newUser.handle}`).set(userCredntial);
    })
    .then(() => {
      return res.status(200).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ error: 'email already in use' });
      } else {
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      }
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (isEmpty(password)) {
    return res.status(404).json({ error: 'password must not be empty' });
  } else if (isEmpty(email)) {
    return res.status(400).json({ msg: 'email must not be empty' });
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => data.user.getIdToken())
    .then((token) => {
      return res.status(200).json({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ general: 'wrong credential' });
    });
};
