// models/familyDetailsModel.js
const db = require('../config/db');

class FamilyDetailsModel {
  static createFamilyDetails(familyData, callback) {
    const sql = `INSERT INTO FamilyDetails 
                 (UserID, FathersOccupation, MothersOccupation, NumBrothers, NumBrothersMarried, 
                 NumSisters, NumSistersMarried, FamilyStatus, FamilyType, FamilyNativePlace, FamilyPhoto, AboutFamily) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        familyData.UserID,
        familyData.FathersOccupation,
        familyData.MothersOccupation,
        familyData.NumBrothers,
        familyData.NumBrothersMarried,
        familyData.NumSisters,
        familyData.NumSistersMarried,
        familyData.FamilyStatus,
        familyData.FamilyType,
        familyData.FamilyNativePlace,
        familyData.FamilyPhoto,
        familyData.AboutFamily
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating FamilyDetails:', err);
          callback(err, null);
        } else {
          console.log('FamilyDetails created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getFamilyDetailsById(userId, callback) {
    const sql = 'SELECT * FROM FamilyDetails WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching FamilyDetails:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updateFamilyDetails(userId, familyData, callback) {
    const updateFields = Object.entries(familyData)
      .filter(([key, value]) => key !== 'UserID' && value !== undefined)
      .map(([key, value]) => `${key} = ?`)
      .join(', ');

    const values = Object.values(familyData);
    values.push(userId);

    const sql = `UPDATE FamilyDetails SET ${updateFields} WHERE UserID = ?`;

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating FamilyDetails:', err);
        callback(err, null);
      } else {
        console.log('FamilyDetails updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteFamilyDetails(userId, callback) {
    const sql = 'DELETE FROM FamilyDetails WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting FamilyDetails:', err);
        callback(err, null);
      } else {
        console.log('FamilyDetails deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = FamilyDetailsModel;
