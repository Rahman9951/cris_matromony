// models/educationalInformationModel.js
const db = require('../config/db');

class EducationalInformation {
  static createEducationInfo(educationData, callback) {
    const sql = `INSERT INTO EducationalInformation 
                 (UserID, HighestDegree, DegreeDetail, InstitutionName, InstitutionLocation) 
                 VALUES (?, ?, ?, ?, ?)`;
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
          console.error('Error creating EducationalInformation:', err);
          callback(err, null);
        } else {
          console.log('EducationalInformation created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getEducationInfoById(educationId, callback) {
    const sql = 'SELECT * FROM EducationalInformation WHERE EducationID = ?';
    db.query(sql, [educationId], (err, results) => {
      if (err) {
        console.error('Error fetching EducationalInformation:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updateEducationInfo(educationId, educationData, callback) {
    const sql = `UPDATE EducationalInformation 
                 SET HighestDegree = ?, DegreeDetail = ?, InstitutionName = ?, InstitutionLocation = ? 
                 WHERE EducationID = ?`;
    db.query(
      sql,
      [
        educationData.HighestDegree,
        educationData.DegreeDetail,
        educationData.InstitutionName,
        educationData.InstitutionLocation,
        educationId
      ],
      (err, results) => {
        if (err) {
          console.error('Error updating EducationalInformation:', err);
          callback(err, null);
        } else {
          console.log('EducationalInformation updated successfully');
          callback(null, results);
        }
      }
    );
  }

  static deleteEducationInfo(educationId, callback) {
    const sql = 'DELETE FROM EducationalInformation WHERE EducationID = ?';
    db.query(sql, [educationId], (err, results) => {
      if (err) {
        console.error('Error deleting EducationalInformation:', err);
        callback(err, null);
      } else {
        console.log('EducationalInformation deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = EducationalInformation;
