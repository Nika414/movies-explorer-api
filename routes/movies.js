const router = require('express').Router();
const { checkIdSchema } = require('../validators/general');
const { movieSchema } = require('../validators/movies');

const { getMovies, deleteMovie, addMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:_id', checkIdSchema, deleteMovie);

router.post('/', movieSchema, addMovie);

module.exports = router;
