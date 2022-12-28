module.exports.allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://api.mmovies-explorer.nomoredomains.club',
  'http://api.mmovies-explorer.nomoredomains.club',
  'https://mmovies-explorer.nomoredomains.club',
  'http://mmovies-explorer.nomoredomains.club',
];

module.exports.allowedHeaders = [
  'Content-Type', 'Authorization',
];

module.exports.errorMessages = {
  emailisTaken: 'Пользователь с таким email уже зарегистрирован',
  authRequired: 'Требуется авторизация',
  urlRequired: 'должен быть в формате URL',
  emailRequired: 'Email должен быть вида a@b.cs',
  wrongPasswordOrEmail: 'Неправильные почта или пароль',
  deleteDenied: 'Вы не можете удалить этот фильм',
  movieValidationFailure: 'Некорректные данные при добавлении фильма',
  movieNotFound: 'Фильма с указанным id не существует',
  userNotFound: 'Пользователя с указанным id не существует',
  validationFailed: 'Переданы некорректные данные',
  tooMuchRequests: 'Слишком много запросов',
};
