// services/referencesVerificationService.js
const ReferencesVerification = require('../models/referencesVerificationModel');

class ReferencesVerificationService {
  static createReferencesVerification(req, res) {
    const referencesVerificationData = req.body;
    ReferencesVerification.createReferencesVerification(referencesVerificationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'References verification created successfully' });
      }
    });
  }
}

module.exports = ReferencesVerificationService;
