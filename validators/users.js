const { Joi } = require('celebrate');

const passwordSchema = Joi.string().required();
const emailSchema = Joi.string().required().email();

module.exports = { emailSchema, passwordSchema };
