const express = require('express');
const { getProducts,
    addProducts,
    getSpecificProduct,
    getCartProduct,
    addToCart,
    checkoutProduct,
    editProduct,
    removeCart } = require('../controllers/productController.js');
const authenticateToken = require('../middlewares/Authroizations.js');

const router = express.Router();

router.post('/getproduct', getProducts);
router.post('/singleproduct', getSpecificProduct)
router.post('/add', authenticateToken, addProducts);
router.post('/addCart', authenticateToken, addToCart);
router.post('/cartProduct', authenticateToken, getCartProduct);
router.post('/checkout', authenticateToken, checkoutProduct);
router.post('/editProduct', authenticateToken, editProduct);
router.post('/removeCart', authenticateToken, removeCart)

module.exports = router;