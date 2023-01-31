const { celebrate, Joi, Segments } = require('celebrate');
const { textSchema, numberSchema, urlSchema } = require('./general');

module.exports.movieSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: textSchema,
    director: textSchema,
    duration: numberSchema,
    year: textSchema,
    description: textSchema,
    thumbnail: urlSchema,
    movieId: numberSchema,
    nameRU: textSchema,
    nameEN: textSchema,
    image: urlSchema.required(),
    trailer: urlSchema.required(),
  }),
});
