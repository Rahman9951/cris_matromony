// models/userModel.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
  static createUser(userData, callback) {
    // Hash the password before storing it
    bcrypt.hash(userData.LoginPassword, 10, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        callback(err, null);
      } else {
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
            hash // Store the hashed password
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
    });
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

  static authenticateUser(email, password, callback) {
    const sql = 'SELECT * FROM User WHERE Email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        callback(err, null);
      } else {
        const user = results[0];
        if (!user) {
          // User not found
          callback(null, false);
        } else {
          // Compare hashed password with plaintext password
          bcrypt.compare(password, user.LoginPassword, (err, isMatch) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              callback(err, null);
            } else if (isMatch) {
              // Passwords match, user authenticated
              callback(null, user);
            } else {
              // Passwords don't match
              callback(null, false);
            }
          });
        }
      }
    });
  }


  static getUserByEmailOrMobile(emailOrMobile, callback) {
    const sql = 'SELECT * FROM User WHERE Email = ? OR MobileNumber = ?';
    db.query(sql, [emailOrMobile, emailOrMobile], (err, results) => {
      if (err) {
        console.error('Error fetching user by email or mobile:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Return the first result (if any)
      }
    });
  }

  static authenticateUser(emailOrMobile, password, callback) {
    const sql = 'SELECT * FROM User WHERE Email = ? OR MobileNumber = ?';
    db.query(sql, [emailOrMobile, emailOrMobile], (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        callback(err, null);
      } else {
        const user = results[0];
        if (!user) {
          // User not found
          callback(null, false);
        } else {
          // Compare hashed password with plaintext password
          bcrypt.compare(password, user.LoginPassword, (err, isMatch) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              callback(err, null);
            } else if (isMatch) {
              // Passwords match, user authenticated
              callback(null, user);
            } else {
              // Passwords don't match
              callback(null, false);
            }
          });
        }
      }
    });
  }



  //######
  static createLoginAudit(userId, ipAddress, userAgent, callback) {
    const sql = 'INSERT INTO LoginAudit (UserID, LoginTime, IPAddress, UserAgent) VALUES (?, ?, ?, ?)';
    const loginTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current timestamp
    db.query(sql, [userId, loginTime, ipAddress, userAgent], (err, results) => {
      if (err) {
        console.error('Error creating login audit:', err);
        callback(err, null);
      } else {
        console.log('Login audit created successfully');
        callback(null, results);
      }
    });
  }

  static createLogoutAudit(userId, callback) {
    const sql = 'INSERT INTO LogoutAudit (UserID, LogoutTime) VALUES (?, ?)';
    const logoutTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current timestamp
    db.query(sql, [userId, logoutTime], (err, results) => {
      if (err) {
        console.error('Error creating logout audit:', err);
        callback(err, null);
      } else {
        console.log('Logout audit created successfully');
        callback(null, results);
      }
    });
  }
}



module.exports = User;
