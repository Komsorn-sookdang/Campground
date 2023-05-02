const express = require('express');

// Include other resource routers
const bookingRouter = require('./booking');

const router = express.Router();

// Re-route into other resource routers
router.use('/:campgroundId/bookings/', bookingRouter);

module.exports = router;