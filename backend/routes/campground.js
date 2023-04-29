const express = require('express');

// Include other resource routers
const appointmentRouter = require('./appointment');

const router = express.Router();

// Re-route into other resource routers
router.use('/:campgroundId/appointments/', appointmentRouter);

module.exports = router;