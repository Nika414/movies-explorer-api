const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const EmailIsTakenError = require('../errors/EmailIsTakenError');
const BadRequestError = require('../errors/BadRequestError');
const User = require('../models/users');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      const user = new User({
        name, email, password: hash,
      });
      user
        .save()
        .then((result) => {
          const response = result.toObject();
          delete response.password;
          res.send(response);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new EmailIsTakenError());
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Некорректные данные при создании пользователя'));
          } else next(err);
        });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user.id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователя с указанным id не существует');
      } else {
        const response = result.toObject();
        delete response._id;
        res.send(response);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ id: user._id, token });
    })
    .catch(next);
};

module.exports.changeProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name, email: req.body.email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Пользователя с указанным id не существует');
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else { next(err); }
    });
};
