// models/religiousInformationModel.js
const db = require('../config/db');

class ReligiousInformation {
  static createReligiousInformation(religiousData, callback) {
    const sql = `INSERT INTO ReligiousInformation (UserID, Caste, SubCaste, Community, Denominators) 
                 VALUES (?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        religiousData.UserID,
        religiousData.Caste,
        religiousData.SubCaste,
        religiousData.Community,
        religiousData.Denominators
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating ReligiousInformation:', err);
          callback(err, null);
        } else {
          console.log('ReligiousInformation created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getReligiousInformationById(religiousId, callback) {
    const sql = 'SELECT * FROM ReligiousInformation WHERE UserID = ?';
    db.query(sql, [religiousId], (err, results) => {
      if (err) {
        console.error('Error fetching ReligiousInformation:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updateReligiousInformation(religiousId, religiousData, callback) {
    const updateFields = Object.entries(religiousData).map(([key, value]) => `${key} = ?`).join(', ');

    const sql = `UPDATE ReligiousInformation SET ${updateFields} WHERE UserID = ?`;
    
    const values = Object.values(religiousData);
    values.push(religiousId);

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating ReligiousInformation:', err);
        callback(err, null);
      } else {
        console.log('ReligiousInformation updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteReligiousInformation(religiousId, callback) {
    const sql = 'DELETE FROM ReligiousInformation WHERE UserID = ?';
    db.query(sql, [religiousId], (err, results) => {
      if (err) {
        console.error('Error deleting ReligiousInformation:', err);
        callback(err, null);
      } else {
        console.log('ReligiousInformation deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = ReligiousInformation;