// services/educationalInformationService.js
const EducationalInformation = require('../models/educationalInformationModel');

class EducationalInformationService {
  static createEducationalInformation(req, res) {
    const educationData = req.body;

    const requiredFields = [
      'UserID',
      'HighestDegree',
      'DegreeDetail',
      'InstitutionName',
      'InstitutionLocation'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !educationData[field]);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      res.status(400).json({ error: errorMessage });
      return;
    }

    EducationalInformation.createEducationalInformation(educationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Educational information created successfully' });
      }
    });
  }

  static getEducationalInformationById(req, res) {
    const userId = req.params.id;

    EducationalInformation.getEducationalInformationById(userId, (err, educationDetails) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (!educationDetails) {
          res.status(404).json({ message: 'Educational information not found' });
        } else {
          res.status(200).json(educationDetails);
        }
      }
    });
  }

  static updateEducationalInformation(req, res) {
    const userId = req.params.id;
    const educationData = req.body;

    EducationalInformation.updateEducationalInformation(userId, educationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Educational information updated successfully' });
      }
    });
  }

  static deleteEducationalInformation(req, res) {
    const userId = req.params.id;

    EducationalInformation.deleteEducationalInformation(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Educational information deleted successfully' });
      }
    });
  }
}

module.exports = EducationalInformationService;
