// models/horoscopeInformationModel.js
const db = require('../config/db');

class HoroscopeInformation {
  static createHoroscopeInformation(horoscopeData, callback) {
    const sql = `INSERT INTO HoroscopeInformation 
                 (UserID, Star, Raasi, Gothram, Dosham, DateOfBirth, TimeOfBirth, BirthCountry, BirthState, BirthCity) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        horoscopeData.UserID,
        horoscopeData.Star,
        horoscopeData.Raasi,
        horoscopeData.Gothram,
        horoscopeData.Dosham,
        horoscopeData.DateOfBirth,
        horoscopeData.TimeOfBirth,
        horoscopeData.BirthCountry,
        horoscopeData.BirthState,
        horoscopeData.BirthCity
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating HoroscopeInformation:', err);
          callback(err, null);
        } else {
          console.log('HoroscopeInformation created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getHoroscopeInformationById(userId, callback) {
    const sql = 'SELECT * FROM HoroscopeInformation WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching HoroscopeInformation:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updateHoroscopeInformation(userId, horoscopeData, callback) {
    const updateFields = Object.entries(horoscopeData)
      .filter(([key, value]) => value !== undefined) // Exclude undefined values
      .map(([key, value]) => `${key} = ?`)
      .join(', ');

    const sql = `UPDATE HoroscopeInformation SET ${updateFields} WHERE UserID = ?`;

    const values = Object.values(horoscopeData).filter(value => value !== undefined);
    values.push(userId);

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating HoroscopeInformation:', err);
        callback(err, null);
      } else {
        console.log('HoroscopeInformation updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteHoroscopeInformation(userId, callback) {
    const sql = 'DELETE FROM HoroscopeInformation WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting HoroscopeInformation:', err);
        callback(err, null);
      } else {
        console.log('HoroscopeInformation deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = HoroscopeInformation;