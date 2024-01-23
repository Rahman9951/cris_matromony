// models/registrationModel.js
const db = require('../config/db');

class Registration {
  static createRegistration(registrationData, callback) {
    const {
      UserID,
      CountryCode,
      MobileNumber,
      Email,
      LoginPassword,
      ConfirmPassword,
      MobileOTP,
      EmailOTP,
    } = registrationData;

    const sql = `
      INSERT INTO Registration (
        UserID,
        CountryCode,
        MobileNumber,
        Email,
        LoginPassword,
        ConfirmPassword,
        MobileOTP,
        EmailOTP
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        UserID,
        CountryCode,
        MobileNumber,
        Email,
        LoginPassword,
        ConfirmPassword,
        MobileOTP,
        EmailOTP,
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating registration:', err);
          callback(err, null);
        } else {
          console.log('Registration created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = Registration;
