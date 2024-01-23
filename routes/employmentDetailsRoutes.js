// routes/employmentDetailsRoutes.js
const express = require('express');
const router = express.Router();
const employmentDetailsService = require('../services/employmentDetailsService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',

  employmentDetailsService.createEmploymentDetails
);

module.exports = router;
