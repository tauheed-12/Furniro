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



const Product = mongoose.model('Product', productSchema);


module.exports = Product;