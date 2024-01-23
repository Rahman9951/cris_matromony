// routes/horoscopeInformationRoutes.js
const express = require('express');
const router = express.Router();
const horoscopeInformationService = require('../services/horoscopeInformationService');

// Ensure there is a callback function for the post route
router.post('/create', horoscopeInformationService.createHoroscopeInformation);

module.exports = router;

