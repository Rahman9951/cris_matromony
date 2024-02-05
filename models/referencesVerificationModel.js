// models/referencesVerificationModel.js
const db = require('../config/db');

class ReferencesVerification {
  static createReferencesVerification(referencesData, callback) {
    const sql = 'INSERT INTO ReferencesVerification (UserID, RelativeType, RelativeName, RelativeMobile, FriendName, FriendMobile, OfficeContactHR, OfficeContactExtension, ChurchFatherName, ChurchFatherMobile, ChurchAddress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
          console.error('Error creating references verification details:', err);
          callback(err, null);
        } else {
          console.log('References verification details created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getReferencesVerificationById(userId, callback) {
    const sql = 'SELECT * FROM ReferencesVerification WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching references verification details:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Results is an array; return the first item
      }
    });
  }

  static updateReferencesVerification(userId, referencesData, callback) {
    const updateFields = Object.entries(referencesData).map(([key, value]) => `${key} = ?`).join(', ');

    const sql = `UPDATE ReferencesVerification SET ${updateFields} WHERE UserID = ?`;

    const values = Object.values(referencesData);
    values.push(userId);

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating references verification details:', err);
        callback(err, null);
      } else {
        console.log('References verification details updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteReferencesVerification(userId, callback) {
    const sql = 'DELETE FROM ReferencesVerification WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting references verification details:', err);
        callback(err, null);
      } else {
        console.log('References verification details deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = ReferencesVerification;
