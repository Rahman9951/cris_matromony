// services/documentsVerificationService.js
const DocumentsVerification = require('../models/documentsVerificationModel');
const multer = require('multer');
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Images'); // Save images in the 'Images' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 } // Limit image size to 500KB
});

class DocumentsVerificationService {
  static createDocumentsVerification(req, res) {
    // Use Multer middleware to handle image uploads
    upload.fields([
      { name: 'IdentityProof', maxCount: 1 },
      { name: 'AddressProof', maxCount: 1 },
      { name: 'EmploymentProof', maxCount: 1 },
      { name: 'EducationProof', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error uploading images' });
      } else {
        const documentsVerificationData = req.body;
        documentsVerificationData.IdentityProof = req.files['IdentityProof'][0].filename;
        documentsVerificationData.AddressProof = req.files['AddressProof'][0].filename;
        documentsVerificationData.EmploymentProof = req.files['EmploymentProof'][0].filename;
        documentsVerificationData.EducationProof = req.files['EducationProof'][0].filename;

        DocumentsVerification.createDocumentsVerification(documentsVerificationData, (err, results) => {
          if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            res.status(201).json({ message: 'DocumentsVerification created successfully' });
          }
        });
      }
    });
  }

  static getDocumentsVerificationById(req, res) {
    const documentsVerificationId = req.params.id;

    DocumentsVerification.getDocumentsVerificationById(documentsVerificationId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static updateDocumentsVerification(req, res) {
    const documentsVerificationId = req.params.id;
    const documentsVerificationData = req.body;

    // Use Multer middleware to handle image uploads
    upload.fields([
      { name: 'IdentityProof', maxCount: 1 },
      { name: 'AddressProof', maxCount: 1 },
      { name: 'EmploymentProof', maxCount: 1 },
      { name: 'EducationProof', maxCount: 1 }
    ])(req, res, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error uploading images' });
      } else {
        documentsVerificationData.IdentityProof = req.files['IdentityProof'][0].filename;
        documentsVerificationData.AddressProof = req.files['AddressProof'][0].filename;
        documentsVerificationData.EmploymentProof = req.files['EmploymentProof'][0].filename;
        documentsVerificationData.EducationProof = req.files['EducationProof'][0].filename;

        DocumentsVerification.updateDocumentsVerification(documentsVerificationId, documentsVerificationData, (err, results) => {
          if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            res.status(200).json({ message: 'DocumentsVerification updated successfully' });
          }
        });
      }
    });
  }

  static deleteDocumentsVerification(req, res) {
    const documentsVerificationId = req.params.id;

    DocumentsVerification.deleteDocumentsVerification(documentsVerificationId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'DocumentsVerification deleted successfully' });
      }
    });
  }
}

module.exports = DocumentsVerificationService;
