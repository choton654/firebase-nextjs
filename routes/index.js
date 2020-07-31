const router = require('express').Router();
const { getPosts, createPosts } = require('../controller/posts');
const { signUp, login } = require('../controller/auth');

router.route('/posts').get(getPosts).post(createPosts);

router.post('/signup', signUp).post('/login', login);

module.exports = router;
