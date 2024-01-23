// services/highestDegreePreferenceService.js
const HighestDegreePreference = require('../models/highestDegreePreferenceModel');

class HighestDegreePreferenceService {
  static createHighestDegreePreference(req, res) {
    const highestDegreePreferenceData = req.body;
    HighestDegreePreference.createHighestDegreePreference(highestDegreePreferenceData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Highest degree preference created successfully' });
      }
    });
  }
}

module.exports = HighestDegreePreferenceService;
