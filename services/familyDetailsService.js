// services/familyDetailsService.js
const FamilyDetails = require('../models/familyDetailsModel');

class FamilyDetailsService {
  static createFamilyDetails(req, res) {
    const familyDetailsData = req.body;
    FamilyDetails.createFamilyDetails(familyDetailsData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Family details created successfully' });
      }
    });
  }
}

module.exports = FamilyDetailsService;
