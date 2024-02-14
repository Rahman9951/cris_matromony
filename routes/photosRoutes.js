const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const PhotosService = require('../services/photosService');

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
router.post('/photo/:userId/:photoType', upload, fileSizeCheck, (req, res) => {
  const userId = req.params.userId;
  const photoType = req.params.photoType;
  PhotosService.uploadPhoto(req, res, userId, photoType);
});

router.get('/photo/:userId/:photoType', (req, res) => {
  const userId = req.params.userId;
  const photoType = req.params.photoType;
  PhotosService.getPhoto(req, res, userId, photoType);
});

router.delete('/photo/:userId/:photoType', (req, res) => {
  const userId = req.params.userId;
  const photoType = req.params.photoType;
  PhotosService.deletePhoto(req, res, userId, photoType);
});

module.exports = router;
