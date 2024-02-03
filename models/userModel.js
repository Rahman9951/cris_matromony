// models/userModel.js
const db = require('../config/db');

class User {
  static createUser(userData, callback) {
    const sql = 'INSERT INTO User (ProfileFor, Name, Gender, DateOfBirth, Age, MaritalStatus, MotherTongue, LanguageKnown, Height, Weight, PhysicalStatus, Hobbies, Interest, CountryCode, MobileNumber, Email, LoginPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sql,
      [
        userData.ProfileFor,
        userData.Name,
        userData.Gender,
        userData.DateOfBirth,
        userData.Age,
        userData.MaritalStatus,
        userData.MotherTongue,
        userData.LanguageKnown,
        userData.Height,
        userData.Weight,
        userData.PhysicalStatus,
        userData.Hobbies,
        userData.Interest,
        userData.CountryCode,
        userData.MobileNumber,
        userData.Email,
        userData.LoginPassword
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating user:', err);
          callback(err, null);
        } else {
          console.log('User created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getUserById(userId, callback) {
    const sql = 'SELECT * FROM User WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Results is an array; return the first item
      }
    });
  }

  static updateUser(userId, userData, callback) {
    const updateFields = Object.entries(userData).map(([key, value]) => `${key} = ?`).join(', ');

    const sql = `UPDATE User SET ${updateFields} WHERE UserID = ?`;
    
    const values = Object.values(userData);
    values.push(userId);

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating user:', err);
        callback(err, null);
      } else {
        console.log('User updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteUser(userId, callback) {
    const sql = 'DELETE FROM User WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting user:', err);
        callback(err, null);
      } else {
        console.log('User deleted successfully');
        callback(null, results);
      }
    });
  }

  static getUserByMobileOrEmail(mobileNumber, email, callback) {
    const sql = 'SELECT * FROM User WHERE MobileNumber = ? OR Email = ?';
    db.query(sql, [mobileNumber, email], (err, results) => {
      if (err) {
        console.error('Error fetching user by mobile or email:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Return the first result (if any)
      }
    });
  }
}

module.exports = User;
