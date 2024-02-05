// routes/employmentDetailsRoutes.js
const express = require('express');
const EmploymentDetailsService = require('../services/employmentDetailsService');
const router = express.Router();

router.post('/employmentDetails', EmploymentDetailsService.createEmploymentDetails);
router.get('/employmentDetails/:id', EmploymentDetailsService.getEmploymentDetailsById);
router.put('/employmentDetails/:id', EmploymentDetailsService.updateEmploymentDetails);
router.delete('/employmentDetails/:id', EmploymentDetailsService.deleteEmploymentDetails);

module.exports = router;
