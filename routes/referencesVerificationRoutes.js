// routes/referencesVerificationRoutes.js
const express = require('express');
const ReferencesVerificationService = require('../services/referencesVerificationService');
const router = express.Router();

// Create References Verification
router.post('/referencesVerification', ReferencesVerificationService.createReferencesVerification);

// Get References Verification by ID
router.get('/referencesVerification/:id', ReferencesVerificationService.getReferencesVerificationById);

// Update References Verification by ID
router.put('/referencesVerification/:id', ReferencesVerificationService.updateReferencesVerification);

// Delete References Verification by ID
router.delete('/referencesVerification/:id', ReferencesVerificationService.deleteReferencesVerification);

module.exports = router;
