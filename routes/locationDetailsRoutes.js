// routes/locationDetailsRoutes.js
const express = require('express');
const LocationDetailsService = require('../services/locationDetailsService');
const router = express.Router();

router.post('/locationDetails', LocationDetailsService.createLocationDetails);
router.get('/locationDetails/:id', LocationDetailsService.getLocationDetailsById);
router.put('/locationDetails/:id', LocationDetailsService.updateLocationDetails);
router.delete('/locationDetails/:id', LocationDetailsService.deleteLocationDetails);

module.exports = router;
