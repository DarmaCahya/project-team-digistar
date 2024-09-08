const mongoose = require('mongoose');

// Skema Produk
const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true
    },
    min_purchase: {
        type: Number,
        required: true,
        default: 1
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
