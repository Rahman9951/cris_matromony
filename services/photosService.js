const path = require('path');
const Photos = require('../models/photosModel');

class PhotosService {
  static uploadPhoto(req, res, userId, photoType) {
    const filePath = req.file.path;
    Photos.insertOrUpdatePhoto(userId, photoType, filePath, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Photo uploaded successfully' });
      }
    });
  }

  static getPhoto(req, res, userId, photoType) {
    Photos.getPhoto(userId, photoType, (err, filePath) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (!filePath) {
        res.status(404).json({ message: 'Photo not found' });
      } else {
        res.sendFile(path.join(__dirname, '..', filePath));
      }
    });
  }

  static deletePhoto(req, res, userId, photoType) {
    Photos.deletePhoto(userId, photoType, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Photo deleted successfully' });
      }
    });
  }
}

module.exports = PhotosService;
