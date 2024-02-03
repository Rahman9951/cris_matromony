const express = require('express');
const router = express.Router();
const preferencesService = require('../services/preferencesService');

// Create Preferences
router.post('/Preference', preferencesService.createPreferences);

// Get Preferences by UserID
router.get('/Preference/:userID', preferencesService.getPreferencesByUserID);

// Update Preferences by UserID
router.put('/Preference/:userID', preferencesService.updatePreferences);

// Delete Preferences by UserID
router.delete('/Preference/:userID', preferencesService.deletePreferences);

module.exports = router;
