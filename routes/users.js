const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { textSchema } = require('../validators/general');
const { emailSchema } = require('../validators/users');
const {
  getCurrentUser, changeProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: textSchema,
    email: emailSchema,
  }),
}), changeProfile);

module.exports = router;
