// models/employmentDetailsModel.js
const db = require('../config/db');

class EmploymentDetails {
  static createEmploymentDetails(employmentDetailsData, callback) {
    const {
      UserID,
      EmploymentType,
      CurrentlyWorkingIn,
      Department,
      Country,
      State,
      City,
      AboutMyself
    } = employmentDetailsData;

    const sql = `
      INSERT INTO EmploymentDetails (
        UserID,
        EmploymentType,
        CurrentlyWorkingIn,
        Department,
        Country,
        State,
        City,
        AboutMyself
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [UserID, EmploymentType, CurrentlyWorkingIn, Department, Country, State, City, AboutMyself],
      (err, results) => {
        if (err) {
          console.error('Error creating employment details:', err);
          callback(err, null);
        } else {
          console.log('Employment details created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = EmploymentDetails;
