const { celebrate, Joi, Segments } = require('celebrate');
const { textSchema } = require('./general');

const passwordSchema = Joi.string().required();
const emailSchema = Joi.string().email();

const signUpSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: textSchema.min(2).max(30),
    email: emailSchema.required(),
    password: passwordSchema,
  }),
});

const signInSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: emailSchema.required(),
    password: passwordSchema,
  }),
});

const changeProfileSchema = celebrate({
  body: Joi.object().keys({
    name: textSchema.min(2).max(30),
    email: emailSchema.required(),
  }),
});

module.exports = {
  signUpSchema, signInSchema, changeProfileSchema, emailSchema, passwordSchema,
};
