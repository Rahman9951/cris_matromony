// routes/auth.js
const express = require('express');
const router = express.Router();
const Users = require('../models/users');

// Endpoint for user login
router.post('/login', async (req, res) => {
  const { matrimonyIdOrMobileOrEmail, password } = req.body;

  try {
    // Authenticate the user
    const user = await Users.authenticateUser(matrimonyIdOrMobileOrEmail, password);

    if (user) {
      // User authenticated successfully
      res.json({ success: true, user });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during user authentication:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
