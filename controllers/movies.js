const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');
const BadRequestError = require('../errors/BadRequestError');
const Movie = require('../models/movies');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      console.log(movies);
      res.send(movies.filter((movie) => req.user.id === movie.owner._id.toString()));
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Фильма с указанным id не существует');
      } else if (result && req.user.id === result.owner.toString()) {
        return result.remove();
      } else {
        throw new AccessError('Вы не можете удалить этот фильм');
      }
    })
    .then((result) => res.send(result))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const movie = new Movie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user.id,
  });
  movie
    .save()
    .then((result) => res.send(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при добавлении фильма'));
      } else { next(err); }
    });
};
