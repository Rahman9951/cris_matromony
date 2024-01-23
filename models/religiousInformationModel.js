// models/religiousInformationModel.js
const db = require('../config/db');

class ReligiousInformation {
  static createReligiousInformation(religiousInformationData, callback) {
    const {
      UserID,
      Caste,
      SubCaste,
      Community,
      Denominators,
    } = religiousInformationData;

    const sql = `
      INSERT INTO ReligiousInformation (
        UserID,
        Caste,
        SubCaste,
        Community,
        Denominators
      ) VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [UserID, Caste, SubCaste, Community, Denominators],
      (err, results) => {
        if (err) {
          console.error('Error creating religious information:', err);
          callback(err, null);
        } else {
          console.log('Religious information created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = ReligiousInformation;
