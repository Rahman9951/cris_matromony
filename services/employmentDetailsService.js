// services/employmentDetailsService.js
const EmploymentDetails = require('../models/employmentDetailsModel');

class EmploymentDetailsService {
  static createEmploymentDetails(req, res) {
    const employmentData = req.body;

    const requiredFields = [
      'UserID',
      'EmploymentType',
      'CurrentlyWorkingIn',
      'Department',
      'Country',
      'State',
      'City',
      'AboutMyself'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !employmentData[field]);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      res.status(400).json({ error: errorMessage });
      return;
    }

    EmploymentDetails.createEmploymentDetails(employmentData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Employment details created successfully' });
      }
    });
  }

  static getEmploymentDetailsById(req, res) {
    const userId = req.params.id;

    EmploymentDetails.getEmploymentDetailsById(userId, (err, employmentDetails) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (!employmentDetails) {
          res.status(404).json({ message: 'Employment details not found' });
        } else {
          res.status(200).json(employmentDetails);
        }
      }
    });
  }

  static updateEmploymentDetails(req, res) {
    const userId = req.params.id;
    const employmentData = req.body;

    EmploymentDetails.updateEmploymentDetails(userId, employmentData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Employment details updated successfully' });
      }
    });
  }

  static deleteEmploymentDetails(req, res) {
    const userId = req.params.id;

    EmploymentDetails.deleteEmploymentDetails(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Employment details deleted successfully' });
      }
    });
  }
}

module.exports = EmploymentDetailsService;
