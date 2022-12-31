const { celebrate, Joi, Segments } = require('celebrate');

const checkId = Joi.string().hex().length(24);
const urlSchema = Joi.string().regex(/https?:\/\/w{0,3}\.?[a-z0-9\-._~:/?#[@!$&'()*+,;=]*\.[a-z0-9\-._~:/?#[@!$&'()*+,;=]*/);
const textSchema = Joi.string().required();
const numberSchema = Joi.number().required();

const checkIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: checkId,
  }),
});

module.exports = {
  urlSchema, checkIdSchema, textSchema, numberSchema,
};
