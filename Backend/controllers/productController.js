import { pool } from "../config/dbConfig.js";
import Stripe from "stripe";
import successMail from "../helper/orderSuccessMail.js";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const getProducts = async (req, res) => {
    try {
        const [products] = await pool.query("SELECT * FROM Products");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error retrieving products:", error);
        res.status(500).json({ message: "Unable to retrieve products!" });
    }
};

export const getSpecificProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const [rows] = await pool.query(
            `
            SELECT 
                p.id AS productId,
                p.productName,
                p.description,
                p.price,
                p.discount,
                p.imageUrl,

                f.id AS featureId,
                f.featureDescription,

                c.color_id AS colorId,
                c.color_name,

                s.size_id AS sizeId,
                s.size,
                s.quantity

            FROM Products p
            LEFT JOIN ProductFeatures f ON p.id = f.productId
            LEFT JOIN Product_colors c ON p.id = c.product_id
            LEFT JOIN Product_sizes s ON c.color_id = s.color_id
            WHERE p.id = ?
            `,
            [productId]
        );

        if (!rows.length) {
            return res.status(404).json({ message: "Product not found!" });
        }

        const product = {
            id: rows[0].productId,
            name: rows[0].productName,
            description: rows[0].description,
            price: rows[0].price,
            discount: rows[0].discount,
            imageUrl: rows[0].imageUrl,
            features: [],
            colors: []
        };

        const featureSet = new Set();
        const colorMap = {};

        rows.forEach(row => {
            if (row.featureId && !featureSet.has(row.featureDescription)) {
                featureSet.add(row.featureDescription);
                product.features.push(row.featureDescription);
            }

            if (row.colorId) {
                if (!colorMap[row.colorId]) {
                    colorMap[row.colorId] = {
                        colorId: row.colorId,
                        colorName: row.color_name,
                        sizes: []
                    };
                }

                if (row.sizeId && !colorMap[row.colorId].sizes.some(s => s.sizeId === row.sizeId)) {
                    colorMap[row.colorId].sizes.push({
                        sizeId: row.sizeId,
                        size: row.size,
                        quantity: row.quantity
                    });
                }
            }
        });

        product.colors = Object.values(colorMap);

        res.status(200).json(product);

    } catch (error) {
        console.error("Error retrieving product:", error);
        res.status(500).json({ message: "Unable to retrieve product!" });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, productImgUrl, productName, color, size, quantity, price } = req.body;
        const [existing] = await pool.query(
            `SELECT * FROM Carts WHERE user_id = ? AND product_id = ? AND color = ? AND size = ?`,
            [userId, productId, color, size]
        );

        if (existing.length) {
            const newQuantity = existing[0].quantity + quantity;
            await pool.query(
                `UPDATE Carts SET quantity = ? WHERE cart_id = ?`,
                [newQuantity, existing[0].cart_id]
            );
            return res.status(200).json({ message: "Cart updated successfully" });
        }
        await pool.query(
            `INSERT INTO Carts (user_id, product_id, product_name, image_url, color, size, quantity, price)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, productId, productName, productImgUrl, color, size, quantity, price]
        );

        res.status(200).json({ message: "Added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCartProduct = async (req, res) => {
    try {
        const { userId } = req.body;

        const [cartItems] = await pool.query(
            `SELECT * FROM Carts WHERE user_id = ? ORDER BY added_at DESC`,
            [userId]
        );

        res.status(200).json(cartItems);
    } catch (error) {
        console.error("Error getting cart data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removeCart = async (req, res) => {
    try {
        const { cartId } = req.body;
        await pool.query("DELETE FROM Carts WHERE cart_id = ?", [cartId]);
        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const checkoutProduct = async (req, res) => {
    const { userId, productIds, addressId, prices, modOfPayment, quantities } = req.body;

    try {
        if (!userId || !productIds || !quantities || !prices || !addressId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let totalPrice = 0;
        productIds.forEach((pid, i) => {
            totalPrice += prices[i] * quantities[i];
        });

        const [orderResult] = await pool.query(
            "INSERT INTO Orders (user_id, address_id, total_price, order_status) VALUES (?, ?, ?, ?)",
            [userId, addressId, totalPrice, "pending"]
        );
        const orderId = orderResult.insertId;

        for (let i = 0; i < productIds.length; i++) {
            await pool.query(
                "INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [orderId, productIds[i], quantities[i], prices[i]]
            );
        }

        const [transactionResult] = await pool.query(
            "INSERT INTO Transactions (order_id, user_id, transaction_type, transaction_status, amount) VALUES (?, ?, ?, ?, ?)",
            [
                orderId,
                userId,
                modOfPayment,
                modOfPayment === "cod" ? "completed" : "pending",
                totalPrice,
            ]
        );
        const transactionId = transactionResult.insertId;

        if (modOfPayment === "cod") {
            await pool.query("UPDATE Orders SET order_status = ? WHERE id = ?", ["paid", orderId]);
            await pool.query("DELETE FROM Carts WHERE user_id = ?", [userId]);
            return res.status(200).json({
                message: "Order placed successfully with COD",
                orderId,
                transactionId,
            });
        } else if (modOfPayment === "stripe") {
            const paymentIntent = await stripeClient.paymentIntents.create({
                amount: totalPrice * 100,
                currency: "usd",
                metadata: { orderId, userId, transactionId },
            });

            return res.status(200).json({
                message: "Stripe Payment initiated",
                clientSecret: paymentIntent.client_secret,
                orderId,
                transactionId,
            });
        } else {
            return res.status(400).json({ message: "Invalid mode of payment" });
        }
    } catch (error) {
        console.error("Error in checkout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeClient.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;

        const { orderId, transactionId } = paymentIntent.metadata;

        await pool.query("UPDATE Transactions SET transaction_status=?, stripe_transaction_id=?, stripe_payment_status=? WHERE id=?",
            ["completed", paymentIntent.id, "succeeded", transactionId]
        );

        await pool.query("UPDATE Orders SET order_status=? WHERE id=?", ["paid", orderId]);
    }

    res.json({ received: true });
};
