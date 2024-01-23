// services/employmentDetailsService.js
const EmploymentDetails = require('../models/employmentDetailsModel');

class EmploymentDetailsService {
  static createEmploymentDetails(req, res) {
    const employmentDetailsData = req.body;
    EmploymentDetails.createEmploymentDetails(employmentDetailsData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Employment details created successfully' });
      }
    });
  }
}

module.exports = EmploymentDetailsService;
