const { Joi } = require('celebrate');

const passwordSchema = Joi.string().required();
const emailSchema = Joi.string().email();

module.exports = { emailSchema, passwordSchema };
