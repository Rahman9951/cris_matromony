// routes/martialStatusRoutes.js
const express = require('express');
const router = express.Router();
const martialStatusService = require('../services/martialStatusService');

router.post('/create', martialStatusService.createMartialStatus);

module.exports = router;
