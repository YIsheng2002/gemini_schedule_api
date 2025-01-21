const express = require('express')
const router = express.Router();
const performance = require('../controllers/performance.controller');

router.get('/performance/:user_id/:date', performance.fetchDailyPerformance);
router.get('/monthlyPerformance/:user_id/:month', performance.fetchMonthlyPerformance);

module.exports = router;