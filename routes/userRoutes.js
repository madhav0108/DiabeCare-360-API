const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticationToken');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// User logout
router.post('/logout', authenticateToken, userController.logoutUser);

// User details
router.get('/userDetails', authenticateToken, userController.getUserDetails);

// Check if user exists
router.post('/check-user-exists', userController.checkIfUserExists);

// Password reset request
router.post('/reset-password-request', userController.resetPasswordRequest);

// Password reset
router.post('/reset-password/:token', userController.resetPassword);

// User deletion
router.delete('/delete', authenticateToken, userController.deleteUser);

module.exports = router;
