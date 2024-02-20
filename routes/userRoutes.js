//routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');
const userService = require('../services/userService');

router.post('/users', userService.createUser);
router.get('/users/:id', authenticateToken, userService.getUserById);
router.put('/users/:id', authenticateToken, userService.updateUser);
router.delete('/users/:id', authenticateToken, userService.deleteUser);
router.post('/login', userService.loginUser);
router.post('/logout', authenticateToken ,userService.logoutUser);
module.exports = router;
