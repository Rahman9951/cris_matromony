// profileModel.js
const db = require('../config/db');

class Profile {
  static createProfile(profileData, callback) {
    // Add your logic to save Profile form (Form 1) data to the database
    // Example: Insert data into the database
    const sql = 'INSERT INTO Profile (ProfileCreatedFor, Name, Gender, DateOfBirth, Age) VALUES (?, ?, ?, ?, ?)';
    db.query(
      sql,
      [
        profileData.ProfileCreatedFor,
        profileData.Name,
        profileData.Gender,
        profileData.DateOfBirth,
        profileData.Age
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating profile:', err);
          callback(err, null);
        } else {
          console.log('Profile created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = Profile;
