const db = require('../config/db');
const multer = require('multer');

// Configure Multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory (you can configure it to save to disk if needed)
const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 } // Limit file size to 500 KB
});

class DocumentsVerification {
  static createDocumentsVerification(documentsVerificationData, callback) {
    const {
      UserID,
      IdentityProof,
      AddressProof,
      EmploymentProof,
      EducationProof
    } = documentsVerificationData;

    const sql = `
      INSERT INTO DocumentsVerification (
        UserID,
        IdentityProof,
        AddressProof,
        EmploymentProof,
        EducationProof
      ) VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [UserID, IdentityProof, AddressProof, EmploymentProof, EducationProof],
      (err, results) => {
        if (err) {
          console.error('Error creating documents verification:', err);
          callback(err, null);
        } else {
          console.log('Documents verification created successfully');
          callback(null, results);
        }
      }
    );
  }

  static uploadDocuments(req, res, next) {
    // 'IdentityProof', 'AddressProof', 'EmploymentProof', 'EducationProof' are the field names in the form
    const uploadMiddleware = upload.fields([
      { name: 'IdentityProof', maxCount: 1 },
      { name: 'AddressProof', maxCount: 1 },
      { name: 'EmploymentProof', maxCount: 1 },
      { name: 'EducationProof', maxCount: 1 }
    ]);

    uploadMiddleware(req, res, (err) => {
      if (err) {
        console.error('Error uploading documents:', err);
        return res.status(500).json({ error: 'Error uploading documents' });
      }

      // The uploaded files are available in req.files
      // Handle file processing or storage logic here

      // Example: storing file buffer in documentsVerificationData
      req.documentsVerificationData = {
        ...req.body,
        IdentityProof: req.files['IdentityProof'][0].buffer,
        AddressProof: req.files['AddressProof'][0].buffer,
        EmploymentProof: req.files['EmploymentProof'][0].buffer,
        EducationProof: req.files['EducationProof'][0].buffer
      };

      next();
    });
  }
}

module.exports = DocumentsVerification;
