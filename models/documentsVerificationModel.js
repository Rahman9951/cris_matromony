const db = require('../config/db');

class DocumentsVerification {
  static insertDocument(userId, fileType, filePath, callback) {
    const sql = `INSERT INTO DocumentsVerification (UserID, ${fileType}) VALUES (?, ?) ON DUPLICATE KEY UPDATE ${fileType} = ?`;
    db.query(sql, [userId, filePath, filePath], (err, results) => {
      if (err) {
        console.error('Error inserting document:', err);
        callback(err, null);
      } else {
        console.log('Document inserted or updated successfully');
        callback(null, results);
      }
    });
  }

  static updateDocumentPath(userId, fileType, filePath, callback) {
    const sql = `UPDATE DocumentsVerification SET ${fileType} = ? WHERE UserID = ?`;
    db.query(sql, [filePath, userId], (err, results) => {
      if (err) {
        console.error('Error updating document path:', err);
        callback(err, null);
      } else {
        console.log('Document path updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteDocument(userId, fileType, callback) {
    const sql = `UPDATE DocumentsVerification SET ${fileType} = NULL WHERE UserID = ?`;
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting document:', err);
        callback(err, null);
      } else {
        console.log('Document deleted successfully');
        callback(null, results);
      }
    });
  }

  static getDocumentPath(userId, fileType, callback) {
    const sql = `SELECT ${fileType} FROM DocumentsVerification WHERE UserID = ?`;
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching document path:', err);
        callback(err, null);
      } else {
        if (results.length === 0) {
          callback(null, null);
        } else {
          const filePath = results[0][fileType];
          callback(null, filePath);
        }
      }
    });
  }
}

module.exports = DocumentsVerification;
