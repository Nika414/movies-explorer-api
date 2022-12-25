const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  urlSchema, textSchema, numberSchema,
} = require('../validators/general');

const { getMovies, deleteMovie, addMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:_id', deleteMovie);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: textSchema,
    director: textSchema,
    duration: numberSchema,
    year: textSchema,
    description: textSchema,
    thumbnail: urlSchema.required(),
    movieId: numberSchema,
    nameRU: textSchema,
    nameEN: textSchema,
    image: urlSchema.required(),
    trailer: urlSchema.required(),
  }),
}), addMovie);

module.exports = router;
