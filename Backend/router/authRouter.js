import express from 'express';
import { login, register, verifyEmail, forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verifyEmail', verifyEmail);
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword);

export default router;