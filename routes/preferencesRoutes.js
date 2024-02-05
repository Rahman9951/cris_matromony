// routes/preferencesRoutes.js
const express = require('express');
const PreferencesService = require('../services/preferencesService');
const router = express.Router();

router.post('/preferences', PreferencesService.createPreferences);
router.get('/preferences/:id', PreferencesService.getPreferencesById);
router.put('/preferences/:id', PreferencesService.updatePreferences);
router.delete('/preferences/:id', PreferencesService.deletePreferences);

module.exports = router;
