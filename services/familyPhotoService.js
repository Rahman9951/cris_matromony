const multer = require('multer');
const path = require('path');
const FamilyDetails = require('../models/familyDetailsModel');

// Multer configuration
const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 500000 } // 500 KB limit
}).single('familyPhoto');

class FamilyPhotoService {
    static uploadFamilyPhoto(req, res) {
        upload(req, res, (err) => {
            if (err) {
                res.status(400).json({ message: 'Error uploading family photo', error: err.message });
            } else {
                // Update family photo path in the database
                const userId = req.params.id;
                const photoPath = req.file.path;
                FamilyDetails.updateFamilyPhoto(userId, photoPath, (err, results) => {
                    if (err) {
                        res.status(500).json({ message: 'Internal Server Error' });
                    } else {
                        res.status(200).json({ message: 'Family photo uploaded successfully' });
                    }
                });
            }
        });
    }

    static downloadFamilyPhoto(req, res) {
        const userId = req.params.id;
        // Fetch family photo path from the database using user ID
        FamilyDetails.getFamilyDetailsById(userId, (err, familyDetails) => {
            if (err) {
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                if (!familyDetails || !familyDetails.FamilyPhoto) {
                    res.status(404).json({ message: 'Family photo not found' });
                } else {
                    // Return the family photo
                    const photoPath = familyDetails.FamilyPhoto;
                    res.sendFile(path.join(__dirname, '..', photoPath));
                }
            }
        });
    }
    
}

module.exports = FamilyPhotoService;
