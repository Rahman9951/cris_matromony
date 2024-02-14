const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const userService = require('../services/userService');

router.post('/users', authenticateToken, userService.createUser);
router.get('/users/:id', authenticateToken, userService.getUserById);
router.put('/users/:id', authenticateToken, userService.updateUser);
router.delete('/users/:id', authenticateToken, userService.deleteUser);

module.exports = router;
