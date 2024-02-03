// models/documentsVerificationModel.js
const db = require('../config/db');

class DocumentsVerification {
  static createDocumentsVerification(documentsVerificationData, callback) {
    const sql = 'INSERT INTO DocumentsVerification (UserID, IdentityProof, AddressProof, EmploymentProof, EducationProof) VALUES (?, ?, ?, ?, ?)';
    db.query(
      sql,
      [
        documentsVerificationData.UserID,
        documentsVerificationData.IdentityProof,
        documentsVerificationData.AddressProof,
        documentsVerificationData.EmploymentProof,
        documentsVerificationData.EducationProof
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating DocumentsVerification:', err);
          callback(err, null);
        } else {
          console.log('DocumentsVerification created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getDocumentsVerificationById(documentsVerificationId, callback) {
    const sql = 'SELECT * FROM DocumentsVerification WHERE DocumentsID = ?';
    db.query(sql, [documentsVerificationId], (err, results) => {
      if (err) {
        console.error('Error fetching DocumentsVerification:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updateDocumentsVerification(documentsVerificationId, documentsVerificationData, callback) {
    const sql = 'UPDATE DocumentsVerification SET IdentityProof = ?, AddressProof = ?, EmploymentProof = ?, EducationProof = ? WHERE DocumentsID = ?';
    db.query(
      sql,
      [
        documentsVerificationData.IdentityProof,
        documentsVerificationData.AddressProof,
        documentsVerificationData.EmploymentProof,
        documentsVerificationData.EducationProof,
        documentsVerificationId
      ],
      (err, results) => {
        if (err) {
          console.error('Error updating DocumentsVerification:', err);
          callback(err, null);
        } else {
          console.log('DocumentsVerification updated successfully');
          callback(null, results);
        }
      }
    );
  }

  static deleteDocumentsVerification(documentsVerificationId, callback) {
    const sql = 'DELETE FROM DocumentsVerification WHERE DocumentsID = ?';
    db.query(sql, [documentsVerificationId], (err, results) => {
      if (err) {
        console.error('Error deleting DocumentsVerification:', err);
        callback(err, null);
      } else {
        console.log('DocumentsVerification deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = DocumentsVerification;
