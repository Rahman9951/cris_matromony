// models/employmentDetailsModel.js
const db = require('../config/db');

class EmploymentDetails {
  static createEmploymentDetails(employmentData, callback) {
    const sql = 'INSERT INTO EmploymentDetails (UserID, EmploymentType, CurrentlyWorkingIn, Department, Country, State, City, AboutMyself) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
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
          console.error('Error creating employment details:', err);
          callback(err, null);
        } else {
          console.log('Employment details created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getEmploymentDetailsById(userId, callback) {
    const sql = 'SELECT * FROM EmploymentDetails WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching employment details:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Results is an array; return the first item
      }
    });
  }

  static updateEmploymentDetails(userId, employmentData, callback) {
    const updateFields = Object.entries(employmentData).map(([key, value]) => `${key} = ?`).join(', ');

    const sql = `UPDATE EmploymentDetails SET ${updateFields} WHERE UserID = ?`;

    const values = Object.values(employmentData);
    values.push(userId);

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating employment details:', err);
        callback(err, null);
      } else {
        console.log('Employment details updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteEmploymentDetails(userId, callback) {
    const sql = 'DELETE FROM EmploymentDetails WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting employment details:', err);
        callback(err, null);
      } else {
        console.log('Employment details deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = EmploymentDetails;
