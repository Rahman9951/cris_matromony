const db = require('../config/db');

class Photos {
  static insertOrUpdatePhoto(userId, photoType, filePath, callback) {
    const sql = `INSERT INTO Photos (UserID, ${photoType}) VALUES (?, ?) ON DUPLICATE KEY UPDATE ${photoType} = ?`;
    db.query(sql, [userId, filePath, filePath], (err, results) => {
      if (err) {
        console.error('Error inserting or updating photo:', err);
        callback(err, null);
      } else {
        console.log('Photo inserted or updated successfully');
        callback(null, results);
      }
    });
  }

  static updatePhotoPath(userId, photoType, filePath, callback) {
    const sql = `UPDATE Photos SET ${photoType} = ? WHERE UserID = ?`;
    db.query(sql, [filePath, userId], (err, results) => {
      if (err) {
        console.error('Error updating photo path:', err);
        callback(err, null);
      } else {
        console.log('Photo path updated successfully');
        callback(null, results);
      }
    });
  }

  static deletePhoto(userId, photoType, callback) {
    const sql = `UPDATE Photos SET ${photoType} = NULL WHERE UserID = ?`;
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting photo:', err);
        callback(err, null);
      } else {
        console.log('Photo deleted successfully');
        callback(null, results);
      }
    });
  }

  static getPhoto(userId, photoType, callback) {
    const sql = `SELECT ${photoType} FROM Photos WHERE UserID = ?`;
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching photo:', err);
        callback(err, null);
      } else {
        if (results.length === 0) {
          callback(null, null);
        } else {
          const filePath = results[0][photoType];
          callback(null, filePath);
        }
      }
    });
  }
  
}

module.exports = Photos;
