const nodemailer = require('nodemailer');
const uniqid = require('uniqid');
require('dotenv').config();
const User = require('../models/userModel');

const sendEmail = async (mail, mailType, id) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sheikhtauheed75@gmail.com',
            pass: process.env.PASSWORD
        },
    });

    let mailOptions;

    const token = uniqid();

    let updatedField;

    mailType === 'VERIFY' ? updatedField = {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000
    } : updatedField = {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
    }

    await User.findByIdAndUpdate(id, updatedField);

    mailType === 'VERIFY' ? mailOptions = {
        from: 'sheikhtauheed75@gmail.com',
        to: mail,
        subject: 'Verify Our Email',
        text: `http://localhost:3000/verifyemail/${token}`,
    } : mailOptions = {
        from: 'sheikhtauheed75@gmail.com',
        to: mail,
        subject: 'Forget password verification',
        text: `http://localhost:3000/forgotpassword/${token}`
    }
    mailOptions;

    transporter.sendMail(mailOptions);

}

module.exports = sendEmail;