// models/castePreferencesModel.js
const db = require('../config/db');

class CastePreferences {
  static createCastePreferences(castePreferencesData, callback) {
    const { UserID, CastePreference, SubCastePreference, CommunityPreference } = castePreferencesData;

    const sql = `
      INSERT INTO CastePreferences (UserID, CastePreference, SubCastePreference, CommunityPreference) VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [UserID, CastePreference, SubCastePreference, CommunityPreference], (err, results) => {
      if (err) {
        console.error('Error creating caste preferences:', err);
        callback(err, null);
      } else {
        console.log('Caste preferences created successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = CastePreferences;
