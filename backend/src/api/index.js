const router = require('express').Router();
const auth = require('./auth')
const cities = require('./cities') 
const places = require('./places')
const experiences = require('./experiences')
const bookingPlans = require('./booking-plan')
const bookings = require('./booking')

router.use('/auth', auth);
router.use('/cities', cities);
router.use('/places', places);
router.use('/experiences', experiences);
router.use('/booking-plans', bookingPlans);
router.use('/bookings', bookings);

module.exports = router;