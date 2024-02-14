// models/preferencesModel.js
const db = require('../config/db');

class Preferences {
  static createPreferences(preferencesData, callback) {
    const sql = `INSERT INTO Preferences SET ?`;
    db.query(sql, preferencesData, (err, results) => {
      if (err) {
        console.error('Error creating preferences:', err);
        callback(err, null);
      } else {
        console.log('Preferences created successfully');
        callback(null, results);
      }
    });
  }

  static getPreferencesById(userId, callback) {
    const sql = 'SELECT * FROM Preferences WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching preferences:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Results is an array; return the first item
      }
    });
  }

  static updatePreferences(userId, preferencesData, callback) {
    const sql = `UPDATE Preferences SET ? WHERE UserID = ?`;
    db.query(sql, [preferencesData, userId], (err, results) => {
      if (err) {
        console.error('Error updating preferences:', err);
        callback(err, null);
      } else {
        console.log('Preferences updated successfully');
        callback(null, results);
      }
    });
  }

  static deletePreferences(userId, callback) {
    const sql = 'DELETE FROM Preferences WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting preferences:', err);
        callback(err, null);
      } else {
        console.log('Preferences deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = Preferences;
