// services/referencesVerificationService.js
const ReferencesVerification = require('../models/referencesVerificationModel');

class ReferencesVerificationService {
  static createReferencesVerification(req, res) {
    const referencesVerificationData = req.body;

    const requiredFields = [
      'UserID',
      'RelativeType',
      'RelativeName',
      'RelativeMobile',
      'FriendName',
      'FriendMobile',
      'OfficeContactHR',
      'OfficeContactExtension',
      'ChurchFatherName',
      'ChurchFatherMobile',
      'ChurchAddress'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !referencesVerificationData[field]);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      res.status(400).json({ error: errorMessage });
      return;
    }

    ReferencesVerification.createReferencesVerification(referencesVerificationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'References verification details created successfully' });
      }
    });
  }

  static getReferencesVerificationById(req, res) {
    const userId = req.params.id;

    ReferencesVerification.getReferencesVerificationById(userId, (err, referencesVerificationDetails) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (!referencesVerificationDetails) {
          res.status(404).json({ message: 'References verification details not found' });
        } else {
          res.status(200).json(referencesVerificationDetails);
        }
      }
    });
  }

  static updateReferencesVerification(req, res) {
    const userId = req.params.id;
    const referencesVerificationData = req.body;

    ReferencesVerification.updateReferencesVerification(userId, referencesVerificationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'References verification details updated successfully' });
      }
    });
  }

  static deleteReferencesVerification(req, res) {
    const userId = req.params.id;

    ReferencesVerification.deleteReferencesVerification(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'References verification details deleted successfully' });
      }
    });
  }
}

module.exports = ReferencesVerificationService;
