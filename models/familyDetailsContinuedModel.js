// models/familyDetailsContinuedModel.js
const db = require('../config/db');

class FamilyDetailsContinued {
  static createFamilyDetailsContinued(familyDetailsContinuedData, callback) {
    const {
      UserID,
      FamilyStatus,
      FamilyType,
      FamilyNativePlace,
      FamilyPhoto,
      AboutFamily,
    } = familyDetailsContinuedData;

    const sql = `
      INSERT INTO FamilyDetailsContinued (
        UserID,
        FamilyStatus,
        FamilyType,
        FamilyNativePlace,
        FamilyPhoto,
        AboutFamily
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [UserID, FamilyStatus, FamilyType, FamilyNativePlace, FamilyPhoto, AboutFamily],
      (err, results) => {
        if (err) {
          console.error('Error creating family details continued:', err);
          callback(err, null);
        } else {
          console.log('Family details continued created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = FamilyDetailsContinued;
