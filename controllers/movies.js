const NotFoundError = require('../errors/NotFoundError');
const AccessError = require('../errors/AccessError');
const BadRequestError = require('../errors/BadRequestError');
const Movie = require('../models/movies');
const { deleteDenied, movieValidationFailure, movieNotFound } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError(movieNotFound);
      } else if (req.user.id === result.owner.toString()) {
        return result.remove();
      } else {
        throw new AccessError(deleteDenied);
      }
    })
    .then((result) => res.send(result))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const movie = new Movie({
    ...req.body,
    owner: req.user.id,
  });
  movie
    .save()
    .then((result) => res.send(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(movieValidationFailure));
      } else { next(err); }
    });
};
