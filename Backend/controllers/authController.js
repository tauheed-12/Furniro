import bcrypt from 'bcrypt';
import { pool } from '../config/dbConfig.js';
import sendEmail from '../helper/sendEmail.js';
import jwt from 'jsonwebtoken';

// --- Register ---
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);

        if (rows.length > 0) {
            const user = rows[0];
            if (user.is_verified) {
                return res.status(409).json({ message: "User already exists and is verified" });
            } else {
                await sendEmail(email, 'VERIFY', user.id);
                return res.status(200).json({
                    message: "User exists but not verified. Verification email sent again.",
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO Users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        await sendEmail(email, 'VERIFY', result.insertId);

        return res
            .status(201)
            .json({ message: "User registered successfully. Please verify your email." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unable to register user!" });
    }
};


// --- Login ---
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "User does not exist!" });
        }

        const user = rows[0];

        if (!user.is_verified) {
            await sendEmail(email, 'VERIFY', user.id);
            return res.status(401).json({ message: "User is not verified. Please verify the email." });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Incorrect Password!" });
        }

        const token = jwt.sign(
            { email, userId: user.id, isAdmin: user.is_admin },
            process.env.JWT_SECRET || "My_secret_key",
            { expiresIn: "30m" }
        );
        return res.status(200).json({ message: "Login successful!", userId: user.id, isAdmin: user.is_admin, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// --- Verify Email ---
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;

        const [rows] = await pool.query(
            'SELECT * FROM Users WHERE verify_token = ? AND verify_token_expiry > ?',
            [token, Date.now()]
        );
        console.log(rows);
        if (rows.length === 0) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const user = rows[0];

        await pool.query(
            'UPDATE Users SET is_verified = 1, verify_token = NULL, verify_token_expiry = NULL WHERE id = ?',
            [user.id]
        );

        return res.status(200).json({ message: "Email verified successfully", success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// --- Forgot Password ---
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "User does not exist!" });
        }

        const user = rows[0];

        if (!user.is_verified) {
            await sendEmail(email, 'VERIFY', user.id);
            return res.status(401).json({ message: "User is not verified. Please verify the email." });
        }

        await sendEmail(email, 'FORGOT_PASSWORD', user.id);
        return res.status(200).json({ message: "Reset Password Email Is Sent!!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

// --- Reset Password ---
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const [rows] = await pool.query(
            'SELECT * FROM Users WHERE forgot_password_token = ? AND forgot_password_token_expiry > ?',
            [token, Date.now()]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = rows[0];

        await pool.query(
            'UPDATE Users SET password = ?, forgot_password_token = NULL, forgot_password_token_expiry = NULL WHERE id = ?',
            [hashedPassword, user.id]
        );

        return res.status(200).json({ message: "Password has been reset successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
