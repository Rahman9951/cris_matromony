// services/employmentDetailsService.js
const EmploymentDetails = require('../models/employmentDetailsModel');

class EmploymentDetailsService {
  static createEmploymentDetails(req, res) {
    const employmentData = req.body;

    EmploymentDetails.createEmploymentDetails(employmentData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'EmploymentDetails created successfully' });
      }
    });
  }

  static getEmploymentDetailsById(req, res) {
    const employmentId = req.params.id;

    EmploymentDetails.getEmploymentDetailsById(employmentId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static updateEmploymentDetails(req, res) {
    const employmentId = req.params.id;
    const employmentData = req.body;

    EmploymentDetails.updateEmploymentDetails(employmentId, employmentData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'EmploymentDetails updated successfully' });
      }
    });
  }

  static deleteEmploymentDetails(req, res) {
    const employmentId = req.params.id;

    EmploymentDetails.deleteEmploymentDetails(employmentId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'EmploymentDetails deleted successfully' });
      }
    });
  }
}

module.exports = EmploymentDetailsService;
