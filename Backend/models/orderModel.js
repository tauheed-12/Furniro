const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: String,
    color: String,
    quantity: Number,
    size: String,
    price: Number,
    productImgUrl: String,
    status: String,
});


const billingDetailsSchema = new Schema({
    firstName: String,
    lastName: String,
    company: String,
    country: String,
    city: String,
    streetAddress: String,
    province: String,
    zipCode: String,
    email: String,
    additionalInfo: String,
});

const orderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderItems: [orderItemSchema],
    paymentMethod: String,
    billingDetails: billingDetailsSchema
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;