// routes/familyDetailsRoutes.js
const express = require('express');
const router = express.Router();
const familyDetailsService = require('../services/familyDetailsService');

// Ensure there is a callback function for the post route
router.post('/create', familyDetailsService.createFamilyDetails);

module.exports = router;
