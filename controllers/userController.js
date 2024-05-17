const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For handling JWT for login sessions
const crypto = require('crypto'); // For generating password reset tokens
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

// Register User
exports.registerUser = async (req, res) => {
    try {
        console.log("Received registration data:", req.body);
        const { firstName, lastName, dateOfBirth, email, password } = req.body;

        console.log("Password before hashing:", password);
        //const hashedPassword = await bcrypt.hash(password, saltRounds);
        //console.log("Hashed password:", hashedPassword);

        const user = new User({
            firstName,
            lastName,
            dateOfBirth,
            email,
            passwordHash: password
        });

        const newUser = await user.save();
        console.log("User registered with hashed password:", user.passwordHash);

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(201).json({
          token: token,
          user: {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth.toISOString().split('T')[0] // Format date as YYYY-MM-DD
          },
          message: 'User registered successfully'
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    console.log("Attempting to login with:", req.body);  // Log the incoming request body

    try {
        const user = await User.findOne({ email: req.body.email });
        console.log("Retrieved user data:", user); // Log the user data
        console.log("Password for comparison:", req.body.password);
        console.log("Stored hash to compare with:", user.passwordHash);
        if (!user) {
            console.log("No user found with email:", req.body.email);
            return res.status(401).send('Authentication failed: No such user');
        }

        const isPasswordCorrect = await user.checkPassword(req.body.password);
        if (isPasswordCorrect) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            return res.json({
              token: token,
              user: {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                dateOfBirth: user.dateOfBirth.toISOString().split('T')[0] // Format date as YYYY-MM-DD
              }
            });
        } else {
            console.log("Password mismatch for user:", req.body.email);
            return res.status(401).send('Authentication failed: Password mismatch');
        }

    } catch (error) {
        console.error("Server error during login:", error);
        res.status(500).send('Server error');
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.json({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth.toISOString().split('T')[0] // Format date as YYYY-MM-DD
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).send({ message: "Error fetching user details", error: error.message });
    }
};

// Logout User (client-side handling)
exports.logoutUser = (req, res) => {
    res.send("Log out by clearing the JWT on the client side.");
};

// Reset Password Request
exports.resetPasswordRequest = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send("User not found.");
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Construct the reset link
    const resetLink = `https://diabecare360.com/reset/${resetToken}`;

    // Send email with reset token
    try {
        await sendResetEmail(user.email, resetLink);
        res.send("Reset password link has been sent to your email.");
    } catch (error) {
        console.error("Failed to send email: ", error);
        res.status(500).send("Failed to send reset password link.");
    }
};

const sendResetEmail = async (email, link) => {
    const message = {
        to: email,
        from: 'madhav@diabecare360.com', // sender identity in SendGrid
        templateId: 'd-ca7bf47e459e4a4a804e6560e44bd2c1',
        dynamicTemplateData: {
            resetLink: link,  // The URL they will click to reset their password
        },
    };

    try {
        await sgMail.send(message);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).send("Password reset token is invalid or has expired.");
    }

    // Update the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.passwordHash = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.send("Your password has been updated.");
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        // Extract userId from the authenticated token, not from the body
        const userId = req.user.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

module.exports = exports;
