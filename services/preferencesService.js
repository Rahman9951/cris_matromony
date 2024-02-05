// services/preferencesService.js
const Preferences = require('../models/preferencesModel');

class PreferencesService {
  static createPreferences(req, res) {
    const preferencesData = req.body;

    const requiredFields = [
      'UserID',
      'AboutPartner',
      'MartialStatusPreference',
      'AgeFrom',
      'AgeTo',
      'HeightFrom',
      'HeightTo',
      'MotherTonguePreference',
      'PhysicalStatusPreference',
      'EatingHabits',
      'DrinkingHabits',
      'SmokingHabits',
      'CastePreference',
      'SubCastePreference',
      'CommunityPreference',
      'HighestDegreePreference',
      'EmployedInPreference',
      'OccupationPreference',
      'AnnualIncomeFrom',
      'AnnualIncomeTo',
      'CountryPreference',
      'StatePreference',
      'CityPreference',
      'CitizenshipPreference',
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !preferencesData[field]);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      res.status(400).json({ error: errorMessage });
      return;
    }

    Preferences.createPreferences(preferencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Preferences created successfully' });
      }
    });
  }

  static getPreferencesById(req, res) {
    const userId = req.params.id;

    Preferences.getPreferencesById(userId, (err, preferences) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (!preferences) {
          res.status(404).json({ message: 'Preferences not found' });
        } else {
          res.status(200).json(preferences);
        }
      }
    });
  }

  static updatePreferences(req, res) {
    const userId = req.params.id;
    const preferencesData = req.body;

    Preferences.updatePreferences(userId, preferencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Preferences updated successfully' });
      }
    });
  }

  static deletePreferences(req, res) {
    const userId = req.params.id;

    Preferences.deletePreferences(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Preferences deleted successfully' });
      }
    });
  }
}

module.exports = PreferencesService;
