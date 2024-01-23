// services/locationPreferencesService.js
const LocationPreferences = require('../models/locationPreferencesModel');

class LocationPreferencesService {
  static createLocationPreferences(req, res) {
    const locationPreferencesData = req.body;
    LocationPreferences.createLocationPreferences(locationPreferencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Location preferences created successfully' });
      }
    });
  }
}

module.exports = LocationPreferencesService;
