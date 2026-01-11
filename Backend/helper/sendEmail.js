import nodemailer from 'nodemailer';
import uniqid from 'uniqid';
import { pool } from '../config/dbConfig.js';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (mail, mailType, userId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sheikhtauheed75@gmail.com',
      pass: process.env.PASSWORD,
    },
  });

  const token = uniqid();

  // Expiry set to 1 hour from now
  const expiry = new Date(Date.now() + 60 * 60 * 1000);

  // Update user fields in MySQL
  let updateQuery = '';
  if (mailType === 'VERIFY') {
    updateQuery = `
      UPDATE Users 
      SET verify_token = ?, verify_token_expiry = ? 
      WHERE id = ?`;
    await pool.query(updateQuery, [token, expiry, userId]);
  } else {
    updateQuery = `
      UPDATE Users 
      SET forgot_password_token = ?, forgot_password_token_expiry = ? 
      WHERE id = ?`;
    await pool.query(updateQuery, [token, expiry, userId]);
  }

  // Prepare mail content
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
          <p>Thank you for signing up with <strong>Furniro</strong>. Please verify your email by clicking below:</p>
          <div style="text-align:center; margin:30px 0;">
            <a href="${process.env.FRONTEND_URI}/verifyemail/${token}" 
               style="background:#4CAF50; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">
               ✅ Verify My Email
            </a>
          </div>
          <p>If the button doesn’t work, use this link:</p>
          <p style="color:#555;">${process.env.FRONTEND_URI}/verifyemail/${token}</p>
          <hr>
          <p style="font-size:12px; color:#888;">This link will expire in 1 hour.</p>
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
          <p>Click below to reset your password:</p>
          <div style="text-align:center; margin:30px 0;">
            <a href="${process.env.FRONTEND_URI}/forgotpassword/${token}" 
               style="background:#E67E22; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px; font-weight:bold;">
               🔄 Reset Password
            </a>
          </div>
          <p>If the button doesn’t work, copy this link:</p>
          <p style="color:#555;">${process.env.FRONTEND_URI}/forgotpassword/${token}</p>
          <hr>
          <p style="font-size:12px; color:#888;">This link will expire in 1 hour.</p>
        </div>
      `,
    };
  }

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
