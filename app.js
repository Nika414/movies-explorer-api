require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

mongoose.set('strictQuery', true);
const app = express();

const process = require('process');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
];

process.on('uncaughtException', (err, origin) => {
  console.log(`message: ${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`);
});
mongoose.connect('mongodb://localhost:27017/moviesdb', {}, () => {
  console.log('DB is working');
});

app.use(cors(
  {
    origin: allowedOrigins,
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
));
app.use(rateLimit({
  message: { message: 'Слишком много запросов' },
  max: 100,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(requestLogger);
app.use(helmet());
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
