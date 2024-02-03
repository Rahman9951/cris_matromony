const db = require('../config/db');

class PreferencesModel {
  static createPreferences(preferencesData, callback) {
    const sql = 'INSERT INTO Preferences (UserID, AboutPartner, MartialStatusPreference, AgeFrom, AgeTo, HeightFrom, HeightTo, MotherTonguePreference, PhysicalStatusPreference, EatingHabits, DrinkingHabits, SmokingHabits, CastePreference, SubCastePreference, CommunityPreference, HighestDegreePreference, EmployedInPreference, OccupationPreference, AnnualIncomeFrom, AnnualIncomeTo, CountryPreference, StatePreference, CityPreference, CitizenshipPreference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
          console.error('Error creating Preferences:', err);
          callback(err, null);
        } else {
          console.log('Preferences created successfully');
          callback(null, results);
        }
      }
    );
  }

  static getPreferencesByUserID(userID, callback) {
    const sql = 'SELECT * FROM Preferences WHERE UserID = ?';
    db.query(sql, [userID], (err, results) => {
      if (err) {
        console.error('Error fetching Preferences:', err);
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  }

  static updatePreferences(userID, preferencesData, callback) {
    const sql = 'UPDATE Preferences SET AboutPartner = ?, MartialStatusPreference = ?, AgeFrom = ?, AgeTo = ?, HeightFrom = ?, HeightTo = ?, MotherTonguePreference = ?, PhysicalStatusPreference = ?, EatingHabits = ?, DrinkingHabits = ?, SmokingHabits = ?, CastePreference = ?, SubCastePreference = ?, CommunityPreference = ?, HighestDegreePreference = ?, EmployedInPreference = ?, OccupationPreference = ?, AnnualIncomeFrom = ?, AnnualIncomeTo = ?, CountryPreference = ?, StatePreference = ?, CityPreference = ?, CitizenshipPreference = ? WHERE UserID = ?';
    db.query(
      sql,
      [
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
        userID,
      ],
      (err, results) => {
        if (err) {
          console.error('Error updating Preferences:', err);
          callback(err, null);
        } else {
          console.log('Preferences updated successfully');
          callback(null, results);
        }
      }
    );
  }

  static deletePreferences(userID, callback) {
    const sql = 'DELETE FROM Preferences WHERE UserID = ?';
    db.query(sql, [userID], (err, results) => {
      if (err) {
        console.error('Error deleting Preferences:', err);
        callback(err, null);
      } else {
        console.log('Preferences deleted successfully');
        callback(null, results);
      }
    });
  }
}

module.exports = PreferencesModel;
