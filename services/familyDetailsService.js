// services/familyDetailsService.js
const FamilyDetails = require('../models/familyDetailsModel');

class FamilyDetailsService {
  static createFamilyDetails(req, res) {
    const familyDetailsData = req.body;

    const requiredFields = [
      'UserID',
      'FathersOccupation',
      'MothersOccupation',
      'NumBrothers',
      'NumBrothersMarried',
      'NumSisters',
      'NumSistersMarried',
      'FamilyStatus',
      'FamilyType',
      'FamilyNativePlace',
      'AboutFamily'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !familyDetailsData[field]);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      res.status(400).json({ error: errorMessage });
      return;
    }

    FamilyDetails.createFamilyDetails(familyDetailsData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Family details created successfully' });
      }
    });
  }

  static getFamilyDetailsById(req, res) {
    const userId = req.params.id;

    FamilyDetails.getFamilyDetailsById(userId, (err, familyDetails) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (!familyDetails) {
          res.status(404).json({ message: 'Family details not found' });
        } else {
          res.status(200).json(familyDetails);
        }
      }
    });
  }

  static updateFamilyDetails(req, res) {
    const userId = req.params.id;
    const familyDetailsData = req.body;

    FamilyDetails.updateFamilyDetails(userId, familyDetailsData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Family details updated successfully' });
      }
    });
  }

  static deleteFamilyDetails(req, res) {
    const userId = req.params.id;

    FamilyDetails.deleteFamilyDetails(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Family details deleted successfully' });
      }
    });
  }
}

module.exports = FamilyDetailsService;
