const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// User logout
router.post('/logout', userController.logoutUser);

// Password reset
router.post('/reset-password', userController.resetPassword);

// User deletion
router.delete('/delete', userController.deleteUser);

module.exports = router;
