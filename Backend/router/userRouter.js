const express = require('express');
const { login, register, verifyOtp, sendOtp, findOrders } = require('../controllers/userController.js');
const router = express.Router();
const authenticateToken = require('../middlewares/Authroizations.js');

router.post('/login', login);
router.post('/register', register);
router.post('/verifyOtp', verifyOtp);
router.post('/sendOtp', sendOtp);
router.post('/findOrders', authenticateToken, findOrders)

module.exports = router;