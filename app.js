require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const app = express();

const process = require('process');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {}, () => {
  console.log('DB is working');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
