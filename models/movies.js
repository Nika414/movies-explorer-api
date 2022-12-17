const mongoose = require('mongoose');

const { urlSchema, textSchema } = require('../validators/general');

const movieSchema = new mongoose.Schema(
  {
    country: textSchema,
    director: textSchema,
    duration: {
      type: Number,
      required: true,
    },
    year: textSchema,
    description: textSchema,
    image: {
      type: String,
      required: true,
      validate: {
        validator: (value) => !urlSchema.validate(value).error,
        message: 'Постер должен быть в формате URL',
      },
    },
    trailer: {
      type: String,
      required: true,
      validate: {
        validator: (value) => !urlSchema.validate(value).error,
        message: 'Трейлер должен быть в формате URL',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (value) => !urlSchema.validate(value).error,
        message: 'Постер должен быть в формате URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
      min: 1,
    },
    nameRU: textSchema,
    nameEN: textSchema,
  },
);

module.exports = mongoose.model('Movie', movieSchema);
