// models/locationDetailsModel.js
const db = require('../config/db');

class LocationDetails {
  static createLocationDetails(locationData, callback) {
    const sql = 'INSERT INTO LocationDetails (UserID, Country, State, City, Citizenship, CurrentlyLivingInCountry, CurrentlyLivingInState, CurrentlyLivingInCity, CurrentlyLivingInCitizenship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sql,
      [
        locationData.UserID,
        locationData.Country,
        locationData.State,
        locationData.City,
        locationData.Citizenship,
        locationData.CurrentlyLivingInCountry,
        locationData.CurrentlyLivingInState,
        locationData.CurrentlyLivingInCity,
        locationData.CurrentlyLivingInCitizenship
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating location details:', err);
          callback(err, null);
        } else {
          console.log('Location details created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getLocationDetailsById(userId, callback) {
    const sql = 'SELECT * FROM LocationDetails WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching location details:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Results is an array; return the first item
      }
    });
  }

  static updateLocationDetails(userId, locationData, callback) {
    const updateFields = Object.entries(locationData).map(([key, value]) => `${key} = ?`).join(', ');

    const sql = `UPDATE LocationDetails SET ${updateFields} WHERE UserID = ?`;

    const values = Object.values(locationData);
    values.push(userId);

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating location details:', err);
        callback(err, null);
      } else {
        console.log('Location details updated successfully');
        callback(null, results);
      }
    });
  }

  static deleteLocationDetails(userId, callback) {
    const sql = 'DELETE FROM LocationDetails WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting location details:', err);
        callback(err, null);
      } else {
        console.log('Location details deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = LocationDetails;
