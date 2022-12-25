const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/', require('./auth'));

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;
