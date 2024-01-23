// routes/religiousInformationRoutes.js
const express = require('express');
const router = express.Router();
const religiousInformationService = require('../services/religiousInformationService');

// Ensure there is a callback function for the post route
router.post('/create', religiousInformationService.createReligiousInformation);

module.exports = router;
