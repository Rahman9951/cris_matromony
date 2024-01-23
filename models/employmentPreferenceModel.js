// models/employmentPreferenceModel.js
const db = require('../config/db');

class EmploymentPreference {
  static createEmploymentPreference(employmentPreferenceData, callback) {
    const { UserID, EmployedInPreference, OccupationPreference } = employmentPreferenceData;

    const sql = `
      INSERT INTO EmploymentPreference (UserID, EmployedInPreference, OccupationPreference) VALUES (?, ?, ?)
    `;

    db.query(sql, [UserID, EmployedInPreference, OccupationPreference], (err, results) => {
      if (err) {
        console.error('Error creating employment preference:', err);
        callback(err, null);
      } else {
        console.log('Employment preference created successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = EmploymentPreference;
