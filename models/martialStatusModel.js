// models/martialStatusModel.js
const db = require('../config/db');

class MartialStatus {
  static createMartialStatus(martialStatusData, callback) {
    const {
      UserID,
      MaritalStatus,
      MotherTongue,
      LanguageKnown,
      Height,
      Weight,
      PhysicalStatus,
      Hobbies,
      Interest,
    } = martialStatusData;

    const sql = `
      INSERT INTO MartialStatus (
        UserID,
        MaritalStatus,
        MotherTongue,
        LanguageKnown,
        Height,
        Weight,
        PhysicalStatus,
        Hobbies,
        Interest
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        UserID,
        MaritalStatus,
        MotherTongue,
        LanguageKnown,
        Height,
        Weight,
        PhysicalStatus,
        Hobbies,
        Interest,
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating martial status:', err);
          callback(err, null);
        } else {
          console.log('Martial status created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = MartialStatus;
