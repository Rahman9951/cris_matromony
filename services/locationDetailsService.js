// services/locationDetailsService.js
const LocationDetails = require('../models/locationDetailsModel');

class LocationDetailsService {
  static createLocationDetails(req, res) {
    const locationDetailsData = req.body;
    LocationDetails.createLocationDetails(locationDetailsData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Location details created successfully' });
      }
    });
  }
}

module.exports = LocationDetailsService;
