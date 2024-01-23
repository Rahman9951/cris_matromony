// services/employmentPreferenceService.js
const EmploymentPreference = require('../models/employmentPreferenceModel');

class EmploymentPreferenceService {
  static createEmploymentPreference(req, res) {
    const employmentPreferenceData = req.body;
    EmploymentPreference.createEmploymentPreference(employmentPreferenceData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Employment preference created successfully' });
      }
    });
  }
}

module.exports = EmploymentPreferenceService;
