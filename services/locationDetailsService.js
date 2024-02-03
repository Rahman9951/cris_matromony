// services/locationDetailsService.js
const LocationDetails = require('../models/locationDetailsModel');

class LocationDetailsService {
  static createLocationDetails(req, res) {
    const locationData = req.body;

    const requiredFields = [
      'UserID',
      'Country',
      'State',
      'City',
      'Citizenship',
      'CurrentlyLivingInCountry',
      'CurrentlyLivingInState',
      'CurrentlyLivingInCity',
      'CurrentlyLivingInCitizenship'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !locationData[field]);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      res.status(400).json({ error: errorMessage });
      return;
    }

    LocationDetails.createLocationDetails(locationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Location details created successfully' });
      }
    });
  }

  static getLocationDetailsById(req, res) {
    const userId = req.params.id;

    LocationDetails.getLocationDetailsById(userId, (err, locationDetails) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (!locationDetails) {
          res.status(404).json({ message: 'Location details not found' });
        } else {
          res.status(200).json(locationDetails);
        }
      }
    });
  }

  static updateLocationDetails(req, res) {
    const userId = req.params.id;
    const locationData = req.body;

    LocationDetails.updateLocationDetails(userId, locationData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Location details updated successfully' });
      }
    });
  }

  static deleteLocationDetails(req, res) {
    const userId = req.params.id;

    LocationDetails.deleteLocationDetails(userId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Location details deleted successfully' });
      }
    });
  }
}

module.exports = LocationDetailsService;
