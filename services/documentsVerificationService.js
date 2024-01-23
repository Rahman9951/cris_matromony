// services/documentsVerificationService.js
const DocumentsVerification = require('../models/documentsVerificationModel');

class DocumentsVerificationService {
  static createDocumentsVerification(req, res) {
    const documentsVerificationData = req.body;
    DocumentsVerification.createDocumentsVerification(documentsVerificationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Documents verification created successfully' });
      }
    });
  }
}

module.exports = DocumentsVerificationService;
