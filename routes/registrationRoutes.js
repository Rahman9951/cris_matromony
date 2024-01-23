// routes/registrationRoutes.js
const express = require('express');
const router = express.Router();
const registrationService = require('../services/registrationService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',
 
  registrationService.createRegistration
); 

module.exports = router;

