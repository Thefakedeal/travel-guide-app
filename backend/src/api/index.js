const router = require('express').Router();
const auth = require('./auth')
const cities = require('./cities') 
const places = require('./places')


router.use('/auth', auth);
router.use('/cities', cities);
router.use('/places', places);

module.exports = router;