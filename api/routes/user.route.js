const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

// Fetch user
router.get('/user/:user_id', user.fetchUser);

module.exports = router;