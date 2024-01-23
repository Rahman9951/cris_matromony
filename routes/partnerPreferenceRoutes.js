// routes/partnerPreferenceRoutes.js
const express = require('express');
const router = express.Router();
const partnerPreferenceService = require('../services/partnerPreferenceService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',

  partnerPreferenceService.createPartnerPreference
);

module.exports = router;
