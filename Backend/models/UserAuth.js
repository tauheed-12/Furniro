import mongoose from "mongoose";
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
const User = mongoose.model('User', userSchema);
module.exports = User
