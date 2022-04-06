const router = require('express').Router();
const auth = require('./auth')
const cities = require('./cities') 



router.use('/auth', auth);
router.use('/cities', cities);

module.exports = router;