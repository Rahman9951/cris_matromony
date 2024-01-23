// routes/documentsVerificationRoutes.js
const express = require('express');
const router = express.Router();
const documentsVerificationService = require('../services/documentsVerificationService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',

  documentsVerificationService.createDocumentsVerification
);

module.exports = router;
