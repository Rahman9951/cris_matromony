// routes/preferencesRoutes.js
const express = require('express');
const PreferencesService = require('../services/preferencesService');
const router = express.Router();

router.post('/preferences/:userId', PreferencesService.createPreferences);
router.get('/preferences/:userId', PreferencesService.getPreferencesById);
router.patch('/preferences/:userId/partner', PreferencesService.updatePartnerPreferences);
router.patch('/preferences/:userId/basic', PreferencesService.updateBasicPreferences);
router.patch('/preferences/:userId/caste', PreferencesService.updateCastePreferences);
router.patch('/preferences/:userId/educational', PreferencesService.updateEducationalPreferences);
router.patch('/preferences/:userId/employment', PreferencesService.updateEmploymentPreferences);
router.patch('/preferences/:userId/location', PreferencesService.updateLocationPreferences);
router.delete('/preferences/:userId', PreferencesService.deletePreferences);

module.exports = router;
