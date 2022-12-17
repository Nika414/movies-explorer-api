class EmailIsTakenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = 'Пользователь с таким email уже зарегистрирован';
  }
}

module.exports = EmailIsTakenError;
