// services/horoscopeInformationService.js
const HoroscopeInformation = require('../models/horoscopeInformationModel');

class HoroscopeInformationService {
  static createHoroscopeInformation(req, res) {
    const horoscopeData = req.body;

    // Validate required fields
    const requiredFields = ['UserID', 'Star', 'Raasi', 'Gothram', 'Dosham', 'DateOfBirth', 'TimeOfBirth', 'BirthCountry', 'BirthState', 'BirthCity'];
    const missingFields = requiredFields.filter(field => horoscopeData[field] === undefined);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      return res.status(400).json(errorMessage);
    }

    // Proceed with creating HoroscopeInformation
    HoroscopeInformation.createHoroscopeInformation(horoscopeData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'HoroscopeInformation created successfully' });
      }
    });
  }

  static getHoroscopeInformationById(req, res) {
    const userId = req.params.id;

    HoroscopeInformation.getHoroscopeInformationById(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static updateHoroscopeInformation(req, res) {
    const userId = req.params.id;
    const horoscopeData = req.body;

    // Proceed with updating HoroscopeInformation
    HoroscopeInformation.updateHoroscopeInformation(userId, horoscopeData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'HoroscopeInformation updated successfully' });
      }
    });
  }

  static deleteHoroscopeInformation(req, res) {
    const userId = req.params.id;

    HoroscopeInformation.deleteHoroscopeInformation(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'HoroscopeInformation deleted successfully' });
      }
    });
  }
}

module.exports = HoroscopeInformationService;