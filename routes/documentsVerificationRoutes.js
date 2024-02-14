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
}).single('file');

// File size check middleware
const fileSizeCheck = (req, res, next) => {
  if (req.file && req.file.size > 500000) {
    return res.status(400).json({ message: 'File size exceeds the limit of 500KB' });
  }
  next();
};

// Routes
router.post('/document/:userId/:fileType', upload, fileSizeCheck, (req, res) => {
  const userId = req.params.userId;
  const fileType = req.params.fileType;
  DocumentsVerificationService.uploadDocument(req, res, userId, fileType);
});

router.get('/document/:userId/:fileType', (req, res) => {
  const userId = req.params.userId;
  const fileType = req.params.fileType;
  DocumentsVerificationService.downloadDocument(req, res, userId, fileType);
});

router.put('/document/:userId/:fileType', upload, fileSizeCheck, (req, res) => {
  const userId = req.params.userId;
  const fileType = req.params.fileType;
  DocumentsVerificationService.updateDocument(req, res, userId, fileType);
});

router.delete('/document/:userId/:fileType', (req, res) => {
  const userId = req.params.userId;
  const fileType = req.params.fileType;
  DocumentsVerificationService.deleteDocument(req, res, userId, fileType);
});

module.exports = router;
