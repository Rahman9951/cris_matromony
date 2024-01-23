// routes/familyDetailsContinuedRoutes.js
const express = require('express');
const router = express.Router();
const familyDetailsContinuedService = require('../services/familyDetailsContinuedService');
//const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/create',

  familyDetailsContinuedService.createFamilyDetailsContinued
);

module.exports = router;
