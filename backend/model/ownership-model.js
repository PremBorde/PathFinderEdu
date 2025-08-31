const mongoose = require("mongoose");

const ownershipSchema = new mongoose.Schema({
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
    product: {
        type: Array,
        default: [],
    },
    picture: String,
    gstin: String,
});

const Ownership = mongoose.model("Ownership", ownershipSchema);

module.exports = Ownership;
