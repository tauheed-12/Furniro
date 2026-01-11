import { pool } from "../config/dbConfig.js";
import s3 from "../config/s3.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from 'dotenv';
dotenv.config();

export const findOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const [userRows] = await pool.query("SELECT * FROM Users WHERE id = ?", [userId]);
        if (!userRows.length) {
            return res.status(404).json({ message: "User not found" });
        }

        const [orders] = await pool.query("SELECT * FROM Orders WHERE user_id = ?", [userId]);

        if (!orders.length) {
            return res.status(200).json({ orders: [] });
        }

        const ordersWithItems = [];

        for (const order of orders) {
            const [orderItems] = await pool.query(
                `SELECT oi.*, 
                p.productName, 
                p.price AS productPrice, 
                p.imageUrl AS productImgUrl
                FROM OrderItems oi
                LEFT JOIN Products p ON oi.product_id = p.id
                WHERE oi.order_id = ?`,
                [order.id]
            );

            const [transactionRows] = await pool.query(
                `SELECT id, transaction_type, transaction_status, amount, payment_date 
         FROM Transactions 
         WHERE order_id = ?`,
                [order.id]
            );

            ordersWithItems.push({
                ...order,
                orderItems,
                transaction: transactionRows[0] || null
            });
        }

        res.status(200).json({ orders: ordersWithItems });
    } catch (error) {
        console.error("Find orders error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getUserAddresses = async (req, res) => {
    try {
        const { userId } = req.params;
        const [rows] = await pool.query(
            'SELECT * FROM Addresses WHERE user_id = ?',
            [userId]
        );

        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        return res.status(500).json({ message: 'Failed to fetch addresses' });
    }
};

export const addUserAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const {
            address_type,
            address_line1,
            address_line2,
            city,
            state,
            postal_code,
            country,
            phone_number,
            is_primary
        } = req.body;

        if (is_primary) {
            await pool.query(
                'UPDATE Addresses SET is_primary = FALSE WHERE user_id = ?',
                [userId]
            );
        }

        const [result] = await pool.query(
            `INSERT INTO Addresses 
                (user_id, address_type, address_line1, address_line2, city, state, postal_code, country, phone_number, is_primary) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                address_type,
                address_line1,
                address_line2 || null,
                city,
                state || null,
                postal_code,
                country,
                phone_number || null,
                is_primary || false
            ]
        );

        const [newAddress] = await pool.query(
            'SELECT * FROM Addresses WHERE id = ?',
            [result.insertId]
        );

        return res.status(201).json(newAddress[0]);
    } catch (error) {
        console.error('Error adding address:', error);
        return res.status(500).json({ message: 'Failed to add address' });
    }
};

export const addProduct = async (req, res) => {
    try {
        let { productName, description, price, discount, colors, sizes, features } = req.body;

        colors = colors ? JSON.parse(colors) : [];
        sizes = sizes ? JSON.parse(sizes) : [];
        features = features ? JSON.parse(features) : [];

        let imageUrl = null;
        if (req.file) {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `products/${uuidv4()}_${req.file.originalname}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };
            const uploadResult = await s3.upload(params).promise();
            imageUrl = uploadResult.Location;
        }

        const [productResult] = await pool.query(
            `INSERT INTO Products (productName, description, price, discount, imageUrl) 
             VALUES (?, ?, ?, ?, ?)`,
            [productName, description, price, discount || 0, imageUrl]
        );

        const productId = productResult.insertId;

        let colorIdsMap = {};
        for (const c of colors) {
            const [colorResult] = await pool.query(
                `INSERT INTO Product_colors (product_id, color_name) VALUES (?, ?)`,
                [productId, c.colorName]
            );
            colorIdsMap[c.colorName] = colorResult.insertId;
        }

        for (const s of sizes) {
            const { colorName, sizeName, quantity } = s;
            const colorId = colorIdsMap[colorName];
            if (colorId) {
                await pool.query(
                    `INSERT INTO Product_sizes (color_id, size, quantity) VALUES (?, ?, ?)`,
                    [colorId, sizeName, quantity || 0]
                );
            }
        }

        for (const feature of features) {
            await pool.query(
                `INSERT INTO ProductFeatures (productId, featureDescription) VALUES (?, ?)`,
                [productId, feature]
            );
        }

        res.status(201).json({
            message: "Product added successfully",
            productId,
        });
    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
