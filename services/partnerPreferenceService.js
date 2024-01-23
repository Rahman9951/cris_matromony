// services/partnerPreferenceService.js
const PartnerPreference = require('../models/partnerPreferenceModel');

class PartnerPreferenceService {
  static createPartnerPreference(req, res) {
    const partnerPreferenceData = req.body;
    PartnerPreference.createPartnerPreference(partnerPreferenceData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Partner preference created successfully' });
      }
    });
  }
}

module.exports = PartnerPreferenceService;
