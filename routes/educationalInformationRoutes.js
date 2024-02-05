// routes/educationalInformationRoutes.js
const express = require('express');
const EducationalInformationService = require('../services/educationalInformationService');
const router = express.Router();

router.post('/educationalInformation', EducationalInformationService.createEducationalInformation);
router.get('/educationalInformation/:id', EducationalInformationService.getEducationalInformationById);
router.put('/educationalInformation/:id', EducationalInformationService.updateEducationalInformation);
router.delete('/educationalInformation/:id', EducationalInformationService.deleteEducationalInformation);

module.exports = router;
