// models/referencesVerificationModel.js
const db = require('../config/db');

class ReferencesVerification {
  static createReferencesVerification(referencesData, callback) {
    const sql = `INSERT INTO ReferencesVerification 
                 (UserID, RelativeType, RelativeName, RelativeMobile, FriendName, FriendMobile, 
                 OfficeContactHR, OfficeContactExtension, ChurchFatherName, ChurchFatherMobile, ChurchAddress) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        referencesData.UserID,
        referencesData.RelativeType,
        referencesData.RelativeName,
        referencesData.RelativeMobile,
        referencesData.FriendName,
        referencesData.FriendMobile,
        referencesData.OfficeContactHR,
        referencesData.OfficeContactExtension,
        referencesData.ChurchFatherName,
        referencesData.ChurchFatherMobile,
        referencesData.ChurchAddress
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating ReferencesVerification:', err);
          callback(err, null);
        } else {
          console.log('ReferencesVerification created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getReferencesVerificationById(referencesId, callback) {
    const sql = 'SELECT * FROM ReferencesVerification WHERE ReferencesID = ?';
    db.query(sql, [referencesId], (err, results) => {
      if (err) {
        console.error('Error fetching ReferencesVerification:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updateReferencesVerification(referencesId, referencesData, callback) {
    const sql = `UPDATE ReferencesVerification 
                 SET RelativeType = ?, RelativeName = ?, RelativeMobile = ?, FriendName = ?, 
                     FriendMobile = ?, OfficeContactHR = ?, OfficeContactExtension = ?, 
                     ChurchFatherName = ?, ChurchFatherMobile = ?, ChurchAddress = ? 
                 WHERE ReferencesID = ?`;
    db.query(
      sql,
      [
        referencesData.RelativeType,
        referencesData.RelativeName,
        referencesData.RelativeMobile,
        referencesData.FriendName,
        referencesData.FriendMobile,
        referencesData.OfficeContactHR,
        referencesData.OfficeContactExtension,
        referencesData.ChurchFatherName,
        referencesData.ChurchFatherMobile,
        referencesData.ChurchAddress,
        referencesId
      ],
      (err, results) => {
        if (err) {
          console.error('Error updating ReferencesVerification:', err);
          callback(err, null);
        } else {
          console.log('ReferencesVerification updated successfully');
          callback(null, results);
        }
      }
    );
  }

  static deleteReferencesVerification(referencesId, callback) {
    const sql = 'DELETE FROM ReferencesVerification WHERE ReferencesID = ?';
    db.query(sql, [referencesId], (err, results) => {
      if (err) {
        console.error('Error deleting ReferencesVerification:', err);
        callback(err, null);
      } else {
        console.log('ReferencesVerification deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = ReferencesVerification;
