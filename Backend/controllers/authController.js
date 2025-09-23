const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const sendEmail = require('../helper/sendEmail');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(409).json({ message: "User already exists and is verified" });
            } else {
                return res.status(409).json({ message: "User already exists but is not verified. Please verify." });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        sendEmail(email, 'VERIFY', newUser._id);

        return res.status(201).json({ message: "User registered successfully. Please verify your email." });

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: "Unable to register user!" });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "User does not exist!" });
        }

        if (!existingUser.isVerified) {
            await sendEmail(email, 'VERIFY', existingUser._id);
            return res.status(401).json({ message: "User is not verified. Please verify the email." });
        }

        const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Incorrect Password!" });
        }

        const token = jwt.sign(
            { email, userId: existingUser._id, isAdmin: existingUser.isAdmin },
            "My_secret_key",
            { expiresIn: "30m" }
        );

        const userId = existingUser._id

        const isAdmin = existingUser.isAdmin;


        return res.status(200).json({ message: "Login successful!", userId, isAdmin, token });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid token details" });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return res.status(200).json({
            message: "Email verified successfully",
            success: true,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "User does not exist!" });
        }
        if (!existingUser.isVerified) {
            await sendEmail(email, 'VERIFY', existingUser._id);
            return res.status(401).json({ message: "User is not verified. Please verify the email." });
        }
        await sendEmail(email, 'FORGOT_PASSWORD', existingUser._id);
        return res.status(200).json({ message: "Reset Password Email Is Sent!!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

