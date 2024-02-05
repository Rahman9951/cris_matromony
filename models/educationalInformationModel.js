// models/educationalInformationModel.js
const db = require('../config/db');

class EducationalInformation {
  static createEducationalInformation(educationData, callback) {
    const sql = 'INSERT INTO EducationalInformation (UserID, HighestDegree, DegreeDetail, InstitutionName, InstitutionLocation) VALUES (?, ?, ?, ?, ?)';
    db.query(
      sql,
      [
        educationData.UserID,
        educationData.HighestDegree,
        educationData.DegreeDetail,
        educationData.InstitutionName,
        educationData.InstitutionLocation
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating educational information:', err);
          callback(err, null);
        } else {
          console.log('Educational information created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getEducationalInformationById(userId, callback) {
    const sql = 'SELECT * FROM EducationalInformation WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching educational information:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Results is an array; return the first item
      }
    });
  }

  static updateEducationalInformation(userId, educationData, callback) {
    const updateFields = Object.entries(educationData).map(([key, value]) => `${key} = ?`).join(', ');

    const sql = `UPDATE EducationalInformation SET ${updateFields} WHERE UserID = ?`;

    const values = Object.values(educationData);
    values.push(userId);

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating educational information:', err);
        callback(err, null);
      } else {
        console.log('Educational information updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteEducationalInformation(userId, callback) {
    const sql = 'DELETE FROM EducationalInformation WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting educational information:', err);
        callback(err, null);
      } else {
        console.log('Educational information deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = EducationalInformation;
