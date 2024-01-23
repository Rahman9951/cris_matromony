// routes/locationDetailsRoutes.js
const express = require('express');
const router = express.Router();
const locationDetailsService = require('../services/locationDetailsService');

router.post('/create', locationDetailsService.createLocationDetails);

module.exports = router;

