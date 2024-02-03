// services/familyDetailsService.js
const FamilyDetailsModel = require('../models/familyDetailsModel');
const multer = require('multer');
const path = require('path');

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 }, // Limit file size to 500KB
}).single('FamilyPhoto');

class FamilyDetailsService {
  static createFamilyDetails(req, res) {
    upload(req, res, (err) => {
      if (err) {
        res.status(500).json({ message: 'Image upload failed' });
      } else {
        const familyData = req.body;
        familyData.FamilyPhoto = req.file ? req.file.filename : null;

        // Validate required fields
        const requiredFields = [
          'UserID',
          'FathersOccupation',
          'MothersOccupation',
          'NumBrothers',
          'NumBrothersMarried',
          'NumSisters',
          'NumSistersMarried',
          'FamilyStatus',
          'FamilyType',
          'FamilyNativePlace',
          'AboutFamily',
        ];

        // Check for missing fields
        const missingFields = requiredFields.filter((field) => !familyData[field]);

        if (missingFields.length > 0) {
          const errorMessage = {};
          missingFields.forEach((field) => {
            errorMessage[field] = `${field} field is missing`;
          });

          return res.status(400).json({ error: errorMessage });
        }

        FamilyDetailsModel.createFamilyDetails(familyData, (err, results) => {
          if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            res.status(201).json({ message: 'FamilyDetails created successfully' });
          }
        });
      }
    });
  }

  static getFamilyDetailsById(req, res) {
    const userId = req.params.userId;

    FamilyDetailsModel.getFamilyDetailsById(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static updateFamilyDetails(req, res) {
    const userId = req.params.userId;
    const familyData = req.body;

    upload(req, res, (err) => {
      if (err) {
        res.status(500).json({ message: 'Image upload failed' });
      } else {
        familyData.UserID = userId;
        familyData.FamilyPhoto = req.file ? req.file.filename : null;

        FamilyDetailsModel.updateFamilyDetails(userId, familyData, (err, results) => {
          if (err) {
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            res.status(200).json({ message: 'FamilyDetails updated successfully' });
          }
        });
      }
    });
  }

  static deleteFamilyDetails(req, res) {
    const userId = req.params.userId;

    FamilyDetailsModel.deleteFamilyDetails(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'FamilyDetails deleted successfully' });
      }
    });
  }
}

module.exports = FamilyDetailsService;
