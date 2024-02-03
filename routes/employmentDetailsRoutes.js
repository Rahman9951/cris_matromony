// routes/employmentDetailsRoutes.js
const express = require('express');
const EmploymentDetailsService = require('../services/employmentDetailsService');
const router = express.Router();

// Create Employment Details
router.post('/employmentDetails', EmploymentDetailsService.createEmploymentDetails);

// Get Employment Details by ID
router.get('/employmentDetails/:id', EmploymentDetailsService.getEmploymentDetailsById);

// Update Employment Details by ID
router.put('/employmentDetails/:id', EmploymentDetailsService.updateEmploymentDetails);

// Delete Employment Details by ID
router.delete('/employmentDetails/:id', EmploymentDetailsService.deleteEmploymentDetails);

module.exports = router;
