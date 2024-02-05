// models/preferencesModel.js
const db = require('../config/db');

class Preferences {
  static createPreferences(preferencesData, callback) {
    const sql = `INSERT INTO Preferences (UserID, AboutPartner, MartialStatusPreference, AgeFrom, AgeTo,HeightFrom, HeightTo, MotherTonguePreference, PhysicalStatusPreference,EatingHabits, DrinkingHabits, SmokingHabits, CastePreference,SubCastePreference, CommunityPreference, HighestDegreePreference,EmployedInPreference, OccupationPreference, AnnualIncomeFrom, AnnualIncomeTo,CountryPreference, StatePreference, CityPreference, CitizenshipPreference) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.query(
      sql,
      [
        preferencesData.UserID,
        preferencesData.AboutPartner,
        preferencesData.MartialStatusPreference,
        preferencesData.AgeFrom,
        preferencesData.AgeTo,
        preferencesData.HeightFrom,
        preferencesData.HeightTo,
        preferencesData.MotherTonguePreference,
        preferencesData.PhysicalStatusPreference,
        preferencesData.EatingHabits,
        preferencesData.DrinkingHabits,
        preferencesData.SmokingHabits,
        preferencesData.CastePreference,
        preferencesData.SubCastePreference,
        preferencesData.CommunityPreference,
        preferencesData.HighestDegreePreference,
        preferencesData.EmployedInPreference,
        preferencesData.OccupationPreference,
        preferencesData.AnnualIncomeFrom,
        preferencesData.AnnualIncomeTo,
        preferencesData.CountryPreference,
        preferencesData.StatePreference,
        preferencesData.CityPreference,
        preferencesData.CitizenshipPreference,
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating preferences:', err);
          callback(err, null);
        } else {
          console.log('Preferences created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getPreferencesById(userId, callback) {
    const sql = 'SELECT * FROM Preferences WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching preferences:', err);
        callback(err, null);
      } else {
        callback(null, results[0]); // Results is an array; return the first item
      }
    });
  }

  static updatePreferences(userId, preferencesData, callback) {
    const updateFields = Object.entries(preferencesData).map(([key, value]) => `${key} = ?`).join(', ');

    const sql = `UPDATE Preferences SET ${updateFields} WHERE UserID = ?`;

    const values = [...Object.values(preferencesData), userId];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error updating preferences:', err);
        callback(err, null);
      } else {
        console.log('Preferences updated successfully');
        callback(null, results);
      }
    });
  }

  static deletePreferences(userId, callback) {
    const sql = 'DELETE FROM Preferences WHERE UserID = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting preferences:', err);
        callback(err, null);
      } else {
        console.log('Preferences deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = Preferences;
