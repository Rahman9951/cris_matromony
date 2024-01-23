// services/horoscopeInformationService.js
const HoroscopeInformation = require('../models/horoscopeInformationModel');

class HoroscopeInformationService {
  static createHoroscopeInformation(req, res) {
    const horoscopeInformationData = req.body;
    HoroscopeInformation.createHoroscopeInformation(
      horoscopeInformationData,
      (err, results) => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Horoscope information created successfully' });
        }
      }
    );
  }
}

module.exports = HoroscopeInformationService;
