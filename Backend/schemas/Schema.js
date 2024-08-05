const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorSchema = new Schema({
    colorName: String,
    quantity: Number
});

const sizeSchema = new Schema({
    sizeName: String,
    quantity: Number
});

const reviewSchema = new Schema({
    reviewerName: String,
    reviewerId: String,
    rating: Number,
    comment: String
});

const productSchema = new Schema({
    productName: String,
    description: String,
    price: { type: Number, min: 0 },
    discount: { type: Number, min: 0, max: 100 },
    color: [colorSchema],
    sizes: [sizeSchema],
    features: [String],
    imagesUrl: [String],
    reviews: [reviewSchema]
}, { timestamps: true });

const cartItemSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: String,
    color: String,
    quantity: Number,
    size: String,
    price: Number,
    productImgUrl: String,
});

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

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    isAdmin: Boolean,
    password: { type: String, required: true },
    otp: String,
    isVerified: Boolean,
    cart: [cartItemSchema],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });

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

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Product, User, Order };
