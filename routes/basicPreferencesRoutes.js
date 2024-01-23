// routes/basicPreferencesRoutes.js
const express = require('express');
const router = express.Router();
const basicPreferencesService = require('../services/basicPreferencesService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',
  
  basicPreferencesService.createBasicPreferences
);

module.exports = router;
