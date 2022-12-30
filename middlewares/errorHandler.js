const { errorMessages } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send(errorMessages.serverError);
  }
  next();
};

module.exports = errorHandler;
