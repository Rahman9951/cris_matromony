// services/basicPreferencesService.js
const BasicPreferences = require('../models/basicPreferencesModel');

class BasicPreferencesService {
  static createBasicPreferences(req, res) {
    const basicPreferencesData = req.body;
    BasicPreferences.createBasicPreferences(basicPreferencesData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Basic preferences created successfully' });
      }
    });
  }
}

module.exports = BasicPreferencesService;
