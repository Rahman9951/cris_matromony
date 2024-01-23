// models/basicPreferencesModel.js
const db = require('../config/db');

class BasicPreferences {
  static createBasicPreferences(basicPreferencesData, callback) {
    const {
      UserID,
      MartialStatusPreference,
      AgeFrom,
      AgeTo,
      HeightFrom,
      HeightTo,
      MotherTonguePreference,
      PhysicalStatusPreference,
      EatingHabits,
      DrinkingHabits,
      SmokingHabits
    } = basicPreferencesData;

    const sql = `
      INSERT INTO BasicPreferences (
        UserID,
        MartialStatusPreference,
        AgeFrom,
        AgeTo,
        HeightFrom,
        HeightTo,
        MotherTonguePreference,
        PhysicalStatusPreference,
        EatingHabits,
        DrinkingHabits,
        SmokingHabits
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        UserID,
        MartialStatusPreference,
        AgeFrom,
        AgeTo,
        HeightFrom,
        HeightTo,
        MotherTonguePreference,
        PhysicalStatusPreference,
        EatingHabits,
        DrinkingHabits,
        SmokingHabits
      ],
      (err, results) => {
        if (err) {
          console.error('Error creating basic preferences:', err);
          callback(err, null);
        } else {
          console.log('Basic preferences created successfully');
          callback(null, results);
        }
      }
    );
  }
}

module.exports = BasicPreferences;
