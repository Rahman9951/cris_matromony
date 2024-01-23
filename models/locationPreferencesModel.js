// models/locationPreferencesModel.js
const db = require('../config/db');

class LocationPreferences {
  static createLocationPreferences(locationPreferencesData, callback) {
    const { UserID, CountryPreference, StatePreference, CityPreference, CitizenshipPreference } = locationPreferencesData;

    const sql = `
      INSERT INTO LocationPreferences (UserID, CountryPreference, StatePreference, CityPreference, CitizenshipPreference) 
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [UserID, CountryPreference, StatePreference, CityPreference, CitizenshipPreference], (err, results) => {
      if (err) {
        console.error('Error creating location preferences:', err);
        callback(err, null);
      } else {
        console.log('Location preferences created successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = LocationPreferences;
