// models/highestDegreePreferenceModel.js
const db = require('../config/db');

class HighestDegreePreference {
  static createHighestDegreePreference(highestDegreePreferenceData, callback) {
    const { UserID, HighestDegreePreference } = highestDegreePreferenceData;

    const sql = `
      INSERT INTO HighestDegreePreference (UserID, HighestDegreePreference) VALUES (?, ?)
    `;

    db.query(sql, [UserID, HighestDegreePreference], (err, results) => {
      if (err) {
        console.error('Error creating highest degree preference:', err);
        callback(err, null);
      } else {
        console.log('Highest degree preference created successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = HighestDegreePreference;
