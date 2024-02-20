const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const DocumentsVerificationService = require('../services/documentsVerificationService');

// Multer configuration
const storage = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 } // 500 KB limit
}).fields([
  { name: 'identityProof', maxCount: 1 },
  { name: 'addressProof', maxCount: 1 },
  { name: 'employmentProof', maxCount: 1 },
  { name: 'educationProof', maxCount: 1 }
]);

// Routes
router.post('/documents/:userId', upload, (req, res) => {
  const userId = req.params.userId;
  DocumentsVerificationService.uploadDocuments(req, res, userId);
});

router.get('/document/:fileType/:userId', (req, res) => {
  const userId = req.params.userId;
  const fileType = req.params.fileType;
  DocumentsVerificationService.downloadDocument(req, res, userId, fileType);
});

router.put('/document/:fileType/:userId', upload, (req, res) => {
  const userId = req.params.userId;
  const fileType = req.params.fileType;
  DocumentsVerificationService.updateDocument(req, res, userId, fileType);
});

router.delete('/document/:fileType/:userId', (req, res) => {
  const userId = req.params.userId;
  const fileType = req.params.fileType;
  DocumentsVerificationService.deleteDocument(req, res, userId, fileType);
});

module.exports = router;
