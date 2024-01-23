// services/familyDetailsContinuedService.js
const FamilyDetailsContinued = require('../models/familyDetailsContinuedModel');

class FamilyDetailsContinuedService {
  static createFamilyDetailsContinued(req, res) {
    const familyDetailsContinuedData = req.body;
    FamilyDetailsContinued.createFamilyDetailsContinued(familyDetailsContinuedData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Family details continued created successfully' });
      }
    });
  }
}

module.exports = FamilyDetailsContinuedService;
