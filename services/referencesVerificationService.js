// services/referencesVerificationService.js
const ReferencesVerification = require('../models/referencesVerificationModel');

class ReferencesVerificationService {
  static createReferencesVerification(req, res) {
    const referencesData = req.body;

    ReferencesVerification.createReferencesVerification(referencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'ReferencesVerification created successfully' });
      }
    });
  }

  static getReferencesVerificationById(req, res) {
    const referencesId = req.params.id;

    ReferencesVerification.getReferencesVerificationById(referencesId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static updateReferencesVerification(req, res) {
    const referencesId = req.params.id;
    const referencesData = req.body;

    ReferencesVerification.updateReferencesVerification(referencesId, referencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'ReferencesVerification updated successfully' });
      }
    });
  }

  static deleteReferencesVerification(req, res) {
    const referencesId = req.params.id;

    ReferencesVerification.deleteReferencesVerification(referencesId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'ReferencesVerification deleted successfully' });
      }
    });
  }
}

module.exports = ReferencesVerificationService;
