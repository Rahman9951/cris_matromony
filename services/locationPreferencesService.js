// services/locationPreferencesService.js
const LocationPreferences = require('../models/locationPreferencesModel');

class LocationPreferencesService {
  static createLocationPreferences(req, res) {
    const locationPreferencesData = req.body;

    LocationPreferences.createLocationPreferences(locationPreferencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'LocationPreferences created successfully' });
      }
    });
  }

  static getLocationPreferencesById(req, res) {
    const locationPreferencesId = req.params.id;

    LocationPreferences.getLocationPreferencesById(locationPreferencesId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static updateLocationPreferences(req, res) {
    const locationPreferencesId = req.params.id;
    const locationPreferencesData = req.body;

    LocationPreferences.updateLocationPreferences(locationPreferencesId, locationPreferencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'LocationPreferences updated successfully' });
      }
    });
  }

  static deleteLocationPreferences(req, res) {
    const locationPreferencesId = req.params.id;

    LocationPreferences.deleteLocationPreferences(locationPreferencesId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'LocationPreferences deleted successfully' });
      }
    });
  }
}

module.exports = LocationPreferencesService;
