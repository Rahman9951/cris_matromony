// models/educationalInformationModel.js
const db = require('../config/db');

class EducationalInformation {
  static createEducationalInformation(educationalInformationData, callback) {
    const { UserID, HighestDegree, DegreeDetail, InstitutionName, InstitutionLocation } = educationalInformationData;

    const sql = `
      INSERT INTO EducationalInformation (
        UserID,
        HighestDegree,
        DegreeDetail,
        InstitutionName,
        InstitutionLocation
      ) VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [UserID, HighestDegree, DegreeDetail, InstitutionName, InstitutionLocation],
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
}

module.exports = EducationalInformation;
