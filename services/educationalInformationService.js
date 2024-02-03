// services/educationalInformationService.js
const EducationalInformation = require('../models/educationalInformationModel');

class EducationalInformationService {
  static createEducationInfo(req, res) {
    const educationData = req.body;

    EducationalInformation.createEducationInfo(educationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'EducationalInformation created successfully' });
      }
    });
  }

  static getEducationInfoById(req, res) {
    const educationId = req.params.id;

    EducationalInformation.getEducationInfoById(educationId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static updateEducationInfo(req, res) {
    const educationId = req.params.id;
    const educationData = req.body;

    EducationalInformation.updateEducationInfo(educationId, educationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'EducationalInformation updated successfully' });
      }
    });
  }

  static deleteEducationInfo(req, res) {
    const educationId = req.params.id;

    EducationalInformation.deleteEducationInfo(educationId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'EducationalInformation deleted successfully' });
      }
    });
  }
}

module.exports = EducationalInformationService;
