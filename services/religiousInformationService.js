const ReligiousInformation = require('../models/religiousInformationModel');

class ReligiousInformationService {
  static createReligiousInformation(req, res) {
    const religiousData = req.body;

    // Validate required fields
    const requiredFields = ['UserID', 'Caste', 'SubCaste', 'Community', 'Denominators'];
    const missingFields = requiredFields.filter(field => !religiousData[field]);

    if (missingFields.length > 0) {
      const errorMessage = {};
      missingFields.forEach(field => {
        errorMessage[field] = `${field} field is missing`;
      });

      return res.status(400).json(errorMessage);
    }

    // Proceed with creating ReligiousInformation
    ReligiousInformation.createReligiousInformation(religiousData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'ReligiousInformation created successfully' });
      }
    });
  }

  static getReligiousInformationById(req, res) {
    const religiousId = req.params.id;

    ReligiousInformation.getReligiousInformationById(religiousId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  }

  static updateReligiousInformation(req, res) {
    const religiousId = req.params.id;
    const religiousData = req.body;

    // Validate required fields (if needed)
    // const requiredFields = ['Caste', 'SubCaste', 'Community', 'Denominators'];
    // const missingFields = requiredFields.filter(field => !religiousData[field]);
    // if (missingFields.length > 0) {
    //   const errorMessage = {};
    //   missingFields.forEach(field => {
    //     errorMessage[field] = `${field} field is missing`;
    //   });
    //   return res.status(400).json(errorMessage);
    // }

    // Proceed with updating ReligiousInformation
    ReligiousInformation.updateReligiousInformation(religiousId, religiousData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'ReligiousInformation updated successfully' });
      }
    });
  }

  static deleteReligiousInformation(req, res) {
    const religiousId = req.params.id;

    ReligiousInformation.deleteReligiousInformation(religiousId, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'ReligiousInformation deleted successfully' });
      }
    });
  }
}

module.exports = ReligiousInformationService;