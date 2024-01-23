// profileRoutes.js
const express = require('express');
const ProfileService = require('../services/profileService');
//const ValidationMiddleware = require('../middlewares/validationMiddleware');
const router = express.Router();

// Create Profile
router.post('/create',  ProfileService.createProfile);

module.exports = router;


