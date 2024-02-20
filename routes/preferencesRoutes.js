// routes/preferencesRoutes.js
const express = require('express');
const PreferencesService = require('../services/preferencesService');
const router = express.Router();

router.patch('/preferences/:userId', PreferencesService.createPreferences);
router.get('/preferences/:userId', PreferencesService.getPreferencesById);
router.patch('/preferences/partner/:userId', PreferencesService.updatePartnerPreferences);
router.patch('/preferences/basic/:userId', PreferencesService.updateBasicPreferences);
router.patch('/preferences/caste/:userId', PreferencesService.updateCastePreferences);
router.patch('/preferences/educational/:userId', PreferencesService.updateEducationalPreferences);
router.patch('/preferences/employment/:userId', PreferencesService.updateEmploymentPreferences);
router.patch('/preferences/location/:userId', PreferencesService.updateLocationPreferences);
router.delete('/preferences/:userId', PreferencesService.deletePreferences);

module.exports = router;
