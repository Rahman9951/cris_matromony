// routes/horoscopeInformationRoutes.js
const express = require('express');
const HoroscopeInformationService = require('../services/horoscopeInformationService');
const router = express.Router();

// Create HoroscopeInformation
router.post('/horoscope-information', HoroscopeInformationService.createHoroscopeInformation);

// Get HoroscopeInformation by ID
router.get('/horoscope-information/:id', HoroscopeInformationService.getHoroscopeInformationById);

// Update HoroscopeInformation
router.put('/horoscope-information/:id', HoroscopeInformationService.updateHoroscopeInformation);

// Delete HoroscopeInformation
router.delete('/horoscope-information/:id', HoroscopeInformationService.deleteHoroscopeInformation);

module.exports = router;
