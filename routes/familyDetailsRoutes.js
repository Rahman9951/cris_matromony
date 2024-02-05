// routes/familyDetailsRoutes.js
const express = require('express');
const FamilyDetailsService = require('../services/familyDetailsService');
const router = express.Router();

router.post('/familyDetails', FamilyDetailsService.createFamilyDetails);
router.get('/familyDetails/:id', FamilyDetailsService.getFamilyDetailsById);
router.put('/familyDetails/:id', FamilyDetailsService.updateFamilyDetails);
router.delete('/familyDetails/:id', FamilyDetailsService.deleteFamilyDetails);

module.exports = router;
