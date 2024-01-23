// services/martialStatusService.js
const MartialStatus = require('../models/martialStatusModel');

class MartialStatusService {
  static createMartialStatus(req, res) {
    const martialStatusData = req.body;
    MartialStatus.createMartialStatus(martialStatusData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Martial status created successfully' });
      }
    });
  }
}

module.exports = MartialStatusService;
