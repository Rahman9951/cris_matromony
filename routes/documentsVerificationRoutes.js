// routes/documentsVerificationRoutes.js
const express = require('express');
const DocumentsVerificationService = require('../services/documentsVerificationService');
const router = express.Router();

// Create DocumentsVerification
router.post('/documentsVerification', DocumentsVerificationService.createDocumentsVerification);

// Get DocumentsVerification by ID
router.get('/documentsVerification/:id', DocumentsVerificationService.getDocumentsVerificationById);

// Update DocumentsVerification
router.put('/documentsVerification/:id', DocumentsVerificationService.updateDocumentsVerification);

// Delete DocumentsVerification
router.delete('/documentsVerification/:id', DocumentsVerificationService.deleteDocumentsVerification);

module.exports = router;
