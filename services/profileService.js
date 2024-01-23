// profileService.js
const Profile = require('../models/profileModel');

class ProfileService {
  static createProfile(req, res) {
    const profileData = req.body;

    Profile.createProfile(profileData, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Profile created successfully' });
      }
    });
  }
}

module.exports = ProfileService;
