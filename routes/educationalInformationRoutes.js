// routes/educationalInformationRoutes.js
const express = require('express');
const router = express.Router();
const educationalInformationService = require('../services/educationalInformationService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',
  
  educationalInformationService.createEducationalInformation
);

module.exports = router;
