// services/religiousInformationService.js
const ReligiousInformation = require('../models/religiousInformationModel');

class ReligiousInformationService {
  static createReligiousInformation(req, res) {
    const religiousInformationData = req.body;
    ReligiousInformation.createReligiousInformation(
      religiousInformationData,
      (err, results) => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Religious information created successfully' });
        }
      }
    );
  }
}

module.exports = ReligiousInformationService;
