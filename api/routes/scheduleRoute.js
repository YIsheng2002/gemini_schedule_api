const express = require('express')
const router = express.Router();
const schedule = require('../controllers/scheduleController');

router.get('/schedule', schedule.getScheduleController);

module.exports = router;