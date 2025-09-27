import express from "express";
import { findOrders, addUserAddress, getUserAddresses, addProduct } from "../controllers/userController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();
import authenticateToken from '../middlewares/Authroizations.js';

router.post('/findOrders', authenticateToken, findOrders)
router.get('/address/:userId', authenticateToken, getUserAddresses);
router.post('/address/:userId', authenticateToken, addUserAddress);
router.post("/add", authenticateToken, upload.single("image"), addProduct);
export default router;