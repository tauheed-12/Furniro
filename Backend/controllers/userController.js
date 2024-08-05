const bcrypt = require('bcrypt');
const { User, Order } = require('../schemas/Schema');
const sendMail = require('../config/nodemailer');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser.isVerified) {
            return res.status(409).json({ message: "User already exists and is verified" });
        } else if (existingUser && !existingUser.isVerified) {
            return res.status(401).json({ message: "User is not verified. Please verify the OTP sent to your email." });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const newUser = new User({
                email,
                password: hashedPassword,
                otp,
                isVerified: false
            });
            await newUser.save();
            sendMail(email, otp);
            return res.status(201).json({ message: "User registered successfully. Please verify the OTP sent to your email." });
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
            return res.status(401).json({ message: "User is not verified. Please verify the OTP sent to your email." });
        }

        const isPasswordMatched = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Incorrect Password!" });
        }

        return res.status(200).json(existingUser);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist!" });
        }

        if (existingUser.isVerified) {
            return res.status(409).json({ message: "User is already verified!" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        existingUser.otp = otp;
        await existingUser.save();
        sendMail(email, otp);
        res.status(200).json({ message: "OTP re-sent successfully" });
    } catch (error) {
        console.error("Send OTP error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const userDetail = await User.findOne({ email });

        if (!userDetail) {
            return res.status(404).json({ message: "User not found" });
        }

        if (otp === userDetail.otp) {
            userDetail.isVerified = true;
            userDetail.otp = null;
            await userDetail.save();
            return res.status(200).json({ message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("OTP verify error", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.findOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userData = await User.findById(userId).populate({
            path: 'orders',
            populate: {
                path: 'orderItems.productId',
                model: 'Product'
            }
        });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ orders: userData.orders });
    } catch (error) {
        console.error("Find orders error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

