const router = require('express').Router();
const { signUpSchema, signInSchema } = require('../validators/users');
const {
  createUser, login,
} = require('../controllers/users');

router.post('/signup', signUpSchema, createUser);

router.post('/signin', signInSchema, login);

module.exports = router;
