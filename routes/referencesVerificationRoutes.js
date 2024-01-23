// routes/referencesVerificationRoutes.js
const express = require('express');
const router = express.Router();
const referencesVerificationService = require('../services/referencesVerificationService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',
  
  referencesVerificationService.createReferencesVerification
);

module.exports = router;
