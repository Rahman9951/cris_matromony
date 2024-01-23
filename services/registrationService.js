// services/registrationService.js
const Registration = require('../models/registrationModel');

class RegistrationService {
  static createRegistration(req, res) {
    const registrationData = req.body;
    Registration.createRegistration(registrationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Registration created successfully' });
      }
    });
  }
}

module.exports = RegistrationService;
