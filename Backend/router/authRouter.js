const express = require('express');
const router = express.Router();
const { login, register, verifyEmail } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.post('/verifyEmail', verifyEmail);

module.exports = router;