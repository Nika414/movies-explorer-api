const router = require('express').Router();
const { changeProfileSchema } = require('../validators/users');
const {
  getCurrentUser, changeProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', changeProfileSchema, changeProfile);

module.exports = router;
