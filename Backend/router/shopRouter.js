const express = require('express');
const {
    getProducts,
    addProducts,
    getSpecificProduct,
    getCartProduct,
    addToCart,
    checkoutProduct,
    editProduct,
    removeCart,
    paymentWithStripe
} = require('../controllers/productController.js');
const authenticateToken = require('../middlewares/Authroizations.js');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Ensure correct path

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/getproduct', getProducts);
router.post('/singleproduct', getSpecificProduct);
router.post('/add', authenticateToken, upload.single('image'), addProducts);
router.post('/addCart', authenticateToken, addToCart);
router.post('/cartProduct', authenticateToken, getCartProduct);
router.post('/checkout', authenticateToken, checkoutProduct);
router.post('/editProduct', authenticateToken, editProduct);
router.post('/removeCart', authenticateToken, removeCart);
router.post('/create-payment-intent', paymentWithStripe);

module.exports = router;
