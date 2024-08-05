const express = require('express');
const { getProducts,
    addProducts,
    getSpecificProduct,
    getCartProduct,
    addToCart,
    checkoutProduct,
    editProduct,
    removeCart } = require('../controllers/productController.js');

const router = express.Router();

router.post('/getproduct', getProducts);
router.post('/singleproduct', getSpecificProduct)
router.post('/add', addProducts);
router.post('/addCart', addToCart);
router.post('/cartProduct', getCartProduct);
router.post('/checkout', checkoutProduct);
router.post('/editProduct', editProduct);
router.post('/removeCart', removeCart)

module.exports = router;