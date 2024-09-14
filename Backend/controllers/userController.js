const User = require('../models/userModel');

exports.findOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userData = await User.findById(userId).populate({
            path: 'orders',
            populate: {
                path: 'orderItems.productId',
                model: 'Product'
            }
        });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ orders: userData.orders });
    } catch (error) {
        console.error("Find orders error", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

