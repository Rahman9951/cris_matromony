// models/employmentDetailsModel.js
const db = require('../config/db');

class EmploymentDetails {
  static createEmploymentDetails(employmentData, callback) {
    const sql = `INSERT INTO EmploymentDetails 
                 (UserID, EmploymentType, CurrentlyWorkingIn, Department, Country, State, City, AboutMyself) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [
        employmentData.UserID,
        employmentData.EmploymentType,
        employmentData.CurrentlyWorkingIn,
        employmentData.Department,
        employmentData.Country,
        employmentData.State,
        employmentData.City,
        employmentData.AboutMyself
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating EmploymentDetails:', err);
          callback(err, null);
        } else {
          console.log('EmploymentDetails created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getEmploymentDetailsById(employmentId, callback) {
    const sql = 'SELECT * FROM EmploymentDetails WHERE EmploymentID = ?';
    db.query(sql, [employmentId], (err, results) => {
      if (err) {
        console.error('Error fetching EmploymentDetails:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updateEmploymentDetails(employmentId, employmentData, callback) {
    const sql = `UPDATE EmploymentDetails 
                 SET EmploymentType = ?, CurrentlyWorkingIn = ?, Department = ?, 
                     Country = ?, State = ?, City = ?, AboutMyself = ? 
                 WHERE EmploymentID = ?`;
    db.query(
      sql,
      [
        employmentData.EmploymentType,
        employmentData.CurrentlyWorkingIn,
        employmentData.Department,
        employmentData.Country,
        employmentData.State,
        employmentData.City,
        employmentData.AboutMyself,
        employmentId
      ],
      (err, results) => {
        if (err) {
          console.error('Error updating EmploymentDetails:', err);
          callback(err, null);
        } else {
          console.log('EmploymentDetails updated successfully');
          callback(null, results);
        }
      }
    );
  }

  static deleteEmploymentDetails(employmentId, callback) {
    const sql = 'DELETE FROM EmploymentDetails WHERE EmploymentID = ?';
    db.query(sql, [employmentId], (err, results) => {
      if (err) {
        console.error('Error deleting EmploymentDetails:', err);
        callback(err, null);
      } else {
        console.log('EmploymentDetails deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = EmploymentDetails;
