// models/partnerPreferenceModel.js
const db = require('../config/db');

class PartnerPreference {
  static createPartnerPreference(partnerPreferenceData, callback) {
    const { UserID, AboutPartner } = partnerPreferenceData;

    const sql = `
      INSERT INTO PartnerPreference (UserID, AboutPartner) VALUES (?, ?)
    `;

    db.query(sql, [UserID, AboutPartner], (err, results) => {
      if (err) {
        console.error('Error creating partner preference:', err);
        callback(err, null);
      } else {
        console.log('Partner preference created successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = PartnerPreference;
