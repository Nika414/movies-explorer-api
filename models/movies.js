const mongoose = require('mongoose');
const { urlSchema } = require('../validators/general');
const { urlRequired } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (value) => !urlSchema.validate(value).error,
        message: `Постер ${urlRequired}`,
      },
    },
    trailer: {
      type: String,
      required: true,
      validate: {
        validator: (value) => !urlSchema.validate(value).error,
        message: `Трейлер ${urlRequired}`,
      },
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (value) => !urlSchema.validate(value).error,
        message: `Постер ${urlRequired}`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('Movie', movieSchema);
