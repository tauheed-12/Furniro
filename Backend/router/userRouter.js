const express = require('express');
const { findOrders } = require('../controllers/userController.js');
const router = express.Router();
const authenticateToken = require('../middlewares/Authroizations.js');

router.post('/findOrders', authenticateToken, findOrders)

module.exports = router;