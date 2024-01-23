// routes/castePreferencesRoutes.js
const express = require('express');
const router = express.Router();
const castePreferencesService = require('../services/castePreferencesService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',
  
  castePreferencesService.createCastePreferences
);

module.exports = router;
