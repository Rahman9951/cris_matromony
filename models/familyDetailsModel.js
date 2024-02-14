const db = require('../config/db');

class FamilyDetails {
  static createFamilyDetails(familyDetailsData, callback) {
    const sql = 'INSERT INTO FamilyDetails (UserID, FathersOccupation, MothersOccupation, NumBrothers, NumBrothersMarried, NumSisters, NumSistersMarried, FamilyStatus, FamilyType, FamilyNativePlace, AboutFamily) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(
      sql,
      [
        familyDetailsData.UserID,
        familyDetailsData.FathersOccupation,
        familyDetailsData.MothersOccupation,
        familyDetailsData.NumBrothers,
        familyDetailsData.NumBrothersMarried,
        familyDetailsData.NumSisters,
        familyDetailsData.NumSistersMarried,
        familyDetailsData.FamilyStatus,
        familyDetailsData.FamilyType,
        familyDetailsData.FamilyNativePlace,
        familyDetailsData.AboutFamily,
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating family details:', err);
          callback(err, null);
        } else {
          console.log('Family details created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getFamilyDetailsById(userId, callback) {
    const sql = 'SELECT * FROM FamilyDetails WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching family details:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updateFamilyDetails(userId, familyDetailsData, callback) {
    const updateFields = Object.entries(familyDetailsData).map(([key, value]) => `${key} = ?`).join(', ');
    const sql = `UPDATE FamilyDetails SET ${updateFields} WHERE UserID = ?`;
    const values = Object.values(familyDetailsData);
    values.push(userId);
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating family details:', err);
        callback(err, null);
      } else {
        console.log('Family details updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteFamilyDetails(userId, callback) {
    const sql = 'DELETE FROM FamilyDetails WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting family details:', err);
        callback(err, null);
      } else {
        console.log('Family details deleted successfully');
        callback(null, results);
      }
    });
  }

  static updateFamilyPhoto(userId, photoPath, callback) {
    const sql = 'UPDATE FamilyDetails SET FamilyPhoto = ? WHERE UserID = ?';
    db.query(sql, [photoPath, userId], (err, results) => {
      if (err) {
        console.error('Error updating family photo path:', err);
        callback(err, null);
      } else {
        console.log('Family photo path updated successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = FamilyDetails;
