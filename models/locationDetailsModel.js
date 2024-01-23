// models/locationDetailsModel.js
const db = require('../config/db');

class LocationDetails {
  static createLocationDetails(locationDetailsData, callback) {
    const {
      UserID,
      Country,
      State,
      City,
      Citizenship,
      CurrentlyLivingInCountry,
      CurrentlyLivingInState,
      CurrentlyLivingInCity,
      CurrentlyLivingInCitizenship,
    } = locationDetailsData;

    const sql = `
      INSERT INTO LocationDetails (
        UserID,
        Country,
        State,
        City,
        Citizenship,
        CurrentlyLivingInCountry,
        CurrentlyLivingInState,
        CurrentlyLivingInCity,
        CurrentlyLivingInCitizenship
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        UserID,
        Country,
        State,
        City,
        Citizenship,
        CurrentlyLivingInCountry,
        CurrentlyLivingInState,
        CurrentlyLivingInCity,
        CurrentlyLivingInCitizenship,
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
}

module.exports = LocationDetails;
