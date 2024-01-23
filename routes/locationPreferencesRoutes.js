// routes/locationPreferencesRoutes.js
const express = require('express');
const router = express.Router();
const locationPreferencesService = require('../services/locationPreferencesService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',

  locationPreferencesService.createLocationPreferences
);

module.exports = router;
