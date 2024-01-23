// services/educationalInformationService.js
const EducationalInformation = require('../models/educationalInformationModel');

class EducationalInformationService {
  static createEducationalInformation(req, res) {
    const educationalInformationData = req.body;
    EducationalInformation.createEducationalInformation(educationalInformationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Educational information created successfully' });
      }
    });
  }
}

module.exports = EducationalInformationService;
