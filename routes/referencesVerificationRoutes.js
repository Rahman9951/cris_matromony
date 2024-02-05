// routes/referencesVerificationRoutes.js
const express = require('express');
const ReferencesVerificationService = require('../services/referencesVerificationService');
const router = express.Router();

router.post('/referencesVerification', ReferencesVerificationService.createReferencesVerification);
router.get('/referencesVerification/:id', ReferencesVerificationService.getReferencesVerificationById);
router.put('/referencesVerification/:id', ReferencesVerificationService.updateReferencesVerification);
router.delete('/referencesVerification/:id', ReferencesVerificationService.deleteReferencesVerification);

module.exports = router;
