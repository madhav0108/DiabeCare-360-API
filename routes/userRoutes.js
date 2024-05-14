const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('./middleware/authenticationToken');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// User logout
router.post('/logout', authenticateToken, userController.logoutUser);

// Password reset request
router.post('/reset-password-request', userController.resetPassword);

// Password reset
router.post('/reset-password', userController.resetPassword);

// User deletion
router.delete('/delete', authenticateToken, userController.deleteUser);

module.exports = router;
