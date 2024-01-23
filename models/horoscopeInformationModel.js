// models/horoscopeInformationModel.js
const db = require('../config/db');

class HoroscopeInformation {
  static createHoroscopeInformation(horoscopeInformationData, callback) {
    const {
      UserID,
      Star,
      Raasi,
      Gothram,
      Dosham,
      DateOfBirth,
      TimeOfBirth,
      BirthCountry,
      BirthState,
      BirthCity,
    } = horoscopeInformationData;

    const sql = `
      INSERT INTO HoroscopeInformation (
        UserID,
        Star,
        Raasi,
        Gothram,
        Dosham,
        DateOfBirth,
        TimeOfBirth,
        BirthCountry,
        BirthState,
        BirthCity
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        UserID,
        Star,
        Raasi,
        Gothram,
        Dosham,
        DateOfBirth,
        TimeOfBirth,
        BirthCountry,
        BirthState,
        BirthCity,
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating horoscope information:', err);
          callback(err, null);
        } else {
          console.log('Horoscope information created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = HoroscopeInformation;
