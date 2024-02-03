// routes/userRoutes.js
const express = require('express');
const UserService = require('../services/userService');
const router = express.Router();

router.post('/users', UserService.createUser);
router.get('/users/:id', UserService.getUserById);
router.put('/users/:id', UserService.updateUser);
router.delete('/users/:id', UserService.deleteUser);

module.exports = router;
