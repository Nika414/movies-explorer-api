const { NODE_ENV, DB } = process.env;
const { tooMuchRequests } = require('./constants');

module.exports.mongoServer = `mongodb://localhost:27017/${NODE_ENV === 'production' ? DB : 'bitfilmsdb'}`;

module.exports.rateLimiterConfig = {
  message: { message: tooMuchRequests },
  max: 100,
};
