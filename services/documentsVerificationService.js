const path = require('path');
const DocumentsVerification = require('../models/documentsVerificationModel');

class DocumentsVerificationService {
  static uploadDocument(req, res, userId, fileType) {
    const filePath = req.file.path;
    DocumentsVerification.insertDocument(userId, fileType, filePath, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Document uploaded successfully' });
      }
    });
  }

  static downloadDocument(req, res, userId, fileType) {
    DocumentsVerification.getDocumentPath(userId, fileType, (err, filePath) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (!filePath) {
        res.status(404).json({ message: 'Document not found' });
      } else {
        res.sendFile(path.join(__dirname, '..', filePath));
      }
    });
  }

  static updateDocument(req, res, userId, fileType) {
    const filePath = req.file.path;
    DocumentsVerification.updateDocumentPath(userId, fileType, filePath, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Document updated successfully' });
      }
    });
  }

  static deleteDocument(req, res, userId, fileType) {
    DocumentsVerification.deleteDocument(userId, fileType, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Document deleted successfully' });
      }
    });
  }
}

module.exports = DocumentsVerificationService;
