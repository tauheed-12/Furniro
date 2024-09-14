const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: String,
    color: String,
    quantity: Number,
    size: String,
    price: Number,
    productImgUrl: String,
});

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    cart: [cartItemSchema],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],

    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

}, { timestamps: true });


const User = mongoose.model('User', userSchema);
module.exports = User 
