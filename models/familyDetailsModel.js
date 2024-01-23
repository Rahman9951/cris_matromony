// models/familyDetailsModel.js
const db = require('../config/db');

class FamilyDetails {
  static createFamilyDetails(familyDetailsData, callback) {
    const {
      UserID,
      FathersOccupation,
      MothersOccupation,
      NumBrothers,
      NumBrothersMarried,
      NumSisters,
      NumSistersMarried,
    } = familyDetailsData;

    const sql = `
      INSERT INTO FamilyDetails (
        UserID,
        FathersOccupation,
        MothersOccupation,
        NumBrothers,
        NumBrothersMarried,
        NumSisters,
        NumSistersMarried
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        UserID,
        FathersOccupation,
        MothersOccupation,
        NumBrothers,
        NumBrothersMarried,
        NumSisters,
        NumSistersMarried,
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
}

module.exports = FamilyDetails;
