import express from 'express';
import {
    getProducts,
    getSpecificProduct,
    getCartProduct,
    addToCart,
    checkoutProduct,
    // editProduct,
    removeCart,
    stripeWebhook
} from '../controllers/productController.js';
import authenticateToken from '../middlewares/Authroizations.js';

const router = express.Router();

router.post('/getproduct', getProducts);
router.post('/singleproduct', getSpecificProduct);
router.post('/addCart', authenticateToken, addToCart);
router.post('/cartProduct', authenticateToken, getCartProduct);
router.post('/checkout', authenticateToken, checkoutProduct);
// router.post('/editProduct', authenticateToken, editProduct);
router.post('/removeCart', authenticateToken, removeCart);
router.post('/create-payment-intent', authenticateToken, stripeWebhook);

export default router;
