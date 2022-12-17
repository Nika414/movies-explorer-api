const { Joi } = require('celebrate');

const checkIdSchema = Joi.string().hex().length(24);
const urlSchema = Joi.string().regex(/https?:\/\/w{0,3}\.?[a-z0-9\-._~:/?#[@!$&'()*+,;=]*\.[a-z0-9\-._~:/?#[@!$&'()*+,;=]*/);
const textSchema = Joi.string().required;

module.exports = { urlSchema, checkIdSchema, textSchema };
