const { emailisTaken } = require('../utils/constants');

class EmailIsTakenError extends Error {
  constructor(message = emailisTaken) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = EmailIsTakenError;
