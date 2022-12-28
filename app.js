require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

mongoose.set('strictQuery', true);
const app = express();

const process = require('process');
const { errors } = require('celebrate');

const { PORT, NODE_ENV, DB } = process.env;
const cors = require('cors');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/NotFoundError');

const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedOrigins, allowedHeaders } = require('./utils/constants');
const { mongoServer, rateLimiterConfig } = require('./utils/config');

process.on('uncaughtException', (err, origin) => {
  console.log(`message: ${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});
mongoose.connect(NODE_ENV === 'production' ? `mongodb://localhost:27017/${NODE_ENV === 'production' ? DB : 'bitfilmsdb'}` : mongoServer, {}, () => {
  console.log('DB is working');
});

app.use(cors(
  {
    origin: allowedOrigins,
    allowedHeaders,
  },
));
app.use(requestLogger);

app.use(rateLimit(rateLimiterConfig));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());
app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError(`Страница ${req.url} не найдена`));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
