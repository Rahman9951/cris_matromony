// services/castePreferencesService.js
const CastePreferences = require('../models/castePreferencesModel');

class CastePreferencesService {
  static createCastePreferences(req, res) {
    const castePreferencesData = req.body;
    CastePreferences.createCastePreferences(castePreferencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Caste preferences created successfully' });
      }
    });
  }
}

module.exports = CastePreferencesService;
