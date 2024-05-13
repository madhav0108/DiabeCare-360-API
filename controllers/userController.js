const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For handling JWT for login sessions
const crypto = require('crypto'); // For generating password reset tokens
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstName,
            lastName,
            dateOfBirth,
            email,
            passwordHash: password
        });

        const newUser = await user.save();
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(201).json({ token: token, message: 'User registered successfully' });
        
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.json({ token: token });
        } else {
            res.status(401).send('Authentication failed');
        }
    } catch (error) {
        res.status(500).send('Server error');
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
        const { userId } = req.body;
        await User.findByIdAndDelete(userId);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

module.exports = exports;
