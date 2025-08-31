const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/scratch");

const productSchema = new mongoose.Schema({

    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgColor: String,
    panelColor: String,
    textColor: String,

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
