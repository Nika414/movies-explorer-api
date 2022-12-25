const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const { textSchema } = require('../validators/general');
const { emailSchema, passwordSchema } = require('../validators/users');
const {
  createUser, login,
} = require('../controllers/users');

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: textSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
}), createUser);

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
  }),
}), login);

module.exports = router;
