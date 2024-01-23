// routes/highestDegreePreferenceRoutes.js
const express = require('express');
const router = express.Router();
const highestDegreePreferenceService = require('../services/highestDegreePreferenceService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',
 
  highestDegreePreferenceService.createHighestDegreePreference
);

module.exports = router;
