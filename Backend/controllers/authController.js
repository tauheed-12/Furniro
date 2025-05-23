const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const sendEmail = require('../helper/sendEmail');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.isVerified) {
            return res.status(409).json({ message: "User already exists and is verified" });
        } else if (existingUser && !existingUser.isVerified) {
            return res.status(401).json({ message: "User is not verified. Please verify" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword,
            });
            await newUser.save();
            sendEmail(email, 'VERIFY', newUser._id);
            return res.status(201).json({ message: "User registered successfully. Please verify" });
        }
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
        
        const isAdmin =  existingUser.isAdmin;
        

        return res.status(200).json({ message: "Login successful!", userId, isAdmin, token});

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