const nodemailer = require('nodemailer');
const uniqid = require('uniqid');
require('dotenv').config();
const User = require('../models/userModel');

const sendEmail = async (mail, mailType, id) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sheikhtauheed75@gmail.com',
            pass: process.env.PASSWORD,
        },
    });

    const token = uniqid();

    // update user fields
    let updatedField;
    if (mailType === 'VERIFY') {
        updatedField = {
            verifyToken: token,
            verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        };
    } else {
        updatedField = {
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
        };
    }

    await User.findByIdAndUpdate(id, updatedField);

    // prepare mail options
    let mailOptions;
    if (mailType === 'VERIFY') {
        mailOptions = {
            from: '"Furniro Store 🛋️" <sheikhtauheed75@gmail.com>',
            to: mail,
            subject: '✨ Verify Your Email - Furniro',
            html: `
                <div style="font-family:Arial, sans-serif; padding:20px; max-width:600px; margin:auto; border:1px solid #eee; border-radius:10px;">
                    <h2 style="color:#4CAF50;">Welcome to Furniro! 🎉</h2>
                    <p>Hi there,</p>
                    <p>Thank you for signing up with <strong>Furniro</strong>. To get started, please verify your email address by clicking the button below:</p>
                    
                    <div style="text-align:center; margin:30px 0;">
                        <a href="http://localhost:3000/verifyemail/${token}" 
                           style="background:#4CAF50; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">
                           ✅ Verify My Email
                        </a>
                    </div>
                    
                    <p>If the button doesn’t work, you can also use this link:</p>
                    <p style="color:#555;">http://localhost:3000/verifyemail/${token}</p>
                    
                    <hr>
                    <p style="font-size:12px; color:#888;">This link will expire in 1 hour. If you didn’t create an account, you can ignore this email.</p>
                </div>
            `,
        };
    } else {
        mailOptions = {
            from: '"Furniro Store 🛋️" <sheikhtauheed75@gmail.com>',
            to: mail,
            subject: '🔑 Reset Your Password - Furniro',
            html: `
                <div style="font-family:Arial, sans-serif; padding:20px; max-width:600px; margin:auto; border:1px solid #eee; border-radius:10px;">
                    <h2 style="color:#E67E22;">Forgot Your Password? 🔑</h2>
                    <p>Hi there,</p>
                    <p>We received a request to reset your password. You can reset it by clicking the button below:</p>
                    
                    <div style="text-align:center; margin:30px 0;">
                        <a href="http://localhost:3000/forgotpassword/${token}" 
                           style="background:#E67E22; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">
                           🔄 Reset Password
                        </a>
                    </div>
                    
                    <p>If the button doesn’t work, copy and paste this link into your browser:</p>
                    <p style="color:#555;">http://localhost:3000/forgotpassword/${token}</p>
                    
                    <hr>
                    <p style="font-size:12px; color:#888;">This link will expire in 1 hour. If you didn’t request this, you can ignore this email.</p>
                </div>
            `,
        };
    }

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
