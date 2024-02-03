// routes/religiousInformationRoutes.js
const express = require('express');
const ReligiousInformationService = require('../services/religiousInformationService');
const router = express.Router();

// Create ReligiousInformation
router.post('/religious-information', ReligiousInformationService.createReligiousInformation);

// Get ReligiousInformation by ID
router.get('/religious-information/:id', ReligiousInformationService.getReligiousInformationById);

// Update ReligiousInformation
router.put('/religious-information/:id', ReligiousInformationService.updateReligiousInformation);

// Delete ReligiousInformation
router.delete('/religious-information/:id', ReligiousInformationService.deleteReligiousInformation);

module.exports = router;
