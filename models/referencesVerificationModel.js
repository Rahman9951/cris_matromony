// models/referencesVerificationModel.js
const db = require('../config/db');

class ReferencesVerification {
  static createReferencesVerification(referencesVerificationData, callback) {
    const {
      UserID,
      RelativeType,
      RelativeName,
      RelativeMobile,
      FriendName,
      FriendMobile,
      OfficeContact,
      ChurchFatherName,
      ChurchFatherMobile,
      ChurchAddress
    } = referencesVerificationData;

    const sql = `
      INSERT INTO ReferencesVerification (
        UserID,
        RelativeType,
        RelativeName,
        RelativeMobile,
        FriendName,
        FriendMobile,
        OfficeContact,
        ChurchFatherName,
        ChurchFatherMobile,
        ChurchAddress
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        UserID,
        RelativeType,
        RelativeName,
        RelativeMobile,
        FriendName,
        FriendMobile,
        OfficeContact,
        ChurchFatherName,
        ChurchFatherMobile,
        ChurchAddress
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating references verification:', err);
          callback(err, null);
        } else {
          console.log('References verification created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = ReferencesVerification;
