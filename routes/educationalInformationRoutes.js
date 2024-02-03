// routes/educationalInformationRoutes.js
const express = require('express');
const EducationalInformationService = require('../services/educationalInformationService');
const router = express.Router();

// Create Educational Information
router.post('/educationalInfo', EducationalInformationService.createEducationInfo);

// Get Educational Information by ID
router.get('/educationalInfo/:id', EducationalInformationService.getEducationInfoById);

// Update Educational Information by ID
router.put('/educationalInfo/:id', EducationalInformationService.updateEducationInfo);

// Delete Educational Information by ID
router.delete('/educationalInfo/:id', EducationalInformationService.deleteEducationInfo);

module.exports = router;
