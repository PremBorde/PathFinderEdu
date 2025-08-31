const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: String,
    cart: {
        type: Array,
        default: [],
    },
    isAdmin: Boolean,
    orders: {
        type: Array,
        default: [],
    },
    contact: String,
    picture: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
