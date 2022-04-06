const router = require('express').Router();
const auth = require('./auth')
const cities = require('./cities') 
const places = require('./places')
const experiences = require('./experiences')


router.use('/auth', auth);
router.use('/cities', cities);
router.use('/places', places);
router.use('/experiences', experiences);

module.exports = router;