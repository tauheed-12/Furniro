const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const successMail = require('../helper/orderSuccessMail');
const stripe = require('stripe')('sk_test_51PytxG2MwbGLW2CMwn1xnOkg8pvwjUmCUVGkKlJJYRdvhhv0haRdIwv486aKd27h6BJH4OtJmUBdczyNG2TIdS6900CC9ngWXp');;

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        return res.status(500).json({ message: "Unable to retrieve products!" });
    }
};


const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

exports.addProducts = async (req, res) => {
    let productData = req.body;
    try {
        productData = {
            ...productData,
            imagesUrl: req.file.path
        };
        const newProduct = new Product(productData);
        await newProduct.save();

        return res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({ message: "Unable to add product!" });
    }
};


exports.getSpecificProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        return res.status(500).json({ message: "Unable to retrieve product!" });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { userId, productName, productId, color, quantity, size, price, productImgUrl } = req.body;
        const cartItem = { productId, productName, color, quantity, size, price, productImgUrl };

        const user = await User.findOneAndUpdate(
            { _id: userId, 'cart.productId': { $ne: productId } },
            { $addToSet: { cart: cartItem } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Added to cart successfully" });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getCartProduct = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId);

        const userData = await User.findById(userId).populate('cart.productId');
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userData.cart);
    } catch (error) {
        console.error("Error getting cart data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.removeCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        console.log("Removing from the cartttttttttttt", userId, productId);
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { cart: { productId } } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Product removed from cart successfully", userData: user });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.editProduct = async (req, res) => {
    try {
        const newProductData = req.body;
        const product = await Product.findByIdAndUpdate(newProductData._id, newProductData, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.checkoutProduct = async (req, res) => {
    try {
        const { billingDetails, userId, paymentMethod } = req.body;
        console.log(billingDetails, userId)
        const userDetails = await User.findById(userId);
        const productDetails = userDetails.cart;
        if (!Array.isArray(productDetails) || productDetails.length === 0) {
            return res.status(400).json({ message: "No products to checkout" });
        }

        const newOrderItems = productDetails.map(product => ({
            productId: product.productId,
            productName: product.productName,
            color: product.color,
            size: product.size,
            quantity: product.quantity,
            price: product.price,
            productImgUrl: product.productImgUrl,
            status: 'Pending'
        }));

        console.log(productDetails);
        const newOrder = new Order({
            userId,
            orderItems: newOrderItems,
            paymentMethod,
            billingDetails
        });

        await newOrder.save();

        await User.findByIdAndUpdate(
            userId,
            { $push: { orders: newOrder._id } },
            { new: true }
        );

        const productIds = productDetails.map(product => product.productId);
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { cart: { productId: { $in: productIds } } } },
            { new: true }
        );
        let productNames = "";
        newOrderItems.map((single) => {
            productNames = productNames + single.productName + " ";
        });

        successMail(user.email, productNames);

        return res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error("Error in checkout:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.paymentWithStripe = async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // convert to cents
            currency: "usd",
        });
        console.log(paymentIntent);
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

