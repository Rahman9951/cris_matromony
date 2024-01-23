// routes/employmentPreferenceRoutes.js
const express = require('express');
const router = express.Router();
const employmentPreferenceService = require('../services/employmentPreferenceService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',

  employmentPreferenceService.createEmploymentPreference
);

module.exports = router;
