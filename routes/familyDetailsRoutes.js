// routes/familyDetailsRoutes.js
const express = require('express');
const FamilyDetailsService = require('../services/familyDetailsService');
const router = express.Router();

// Create FamilyDetails
router.post('/fd', FamilyDetailsService.createFamilyDetails);

// Get FamilyDetails by UserID
router.get('/fd/:userId', FamilyDetailsService.getFamilyDetailsById);

// Update FamilyDetails by UserID
router.put('/fd/:userId', FamilyDetailsService.updateFamilyDetails);

// Delete FamilyDetails by UserID
router.delete('/fd/:userId', FamilyDetailsService.deleteFamilyDetails);

module.exports = router;
