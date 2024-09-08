const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        product_id: {
            type: String,
            ref: 'Product', // Refers to Product schema
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    bundles: [{
        bundle_id: {
            type: String,
            ref: 'Bundle', // Refers to Bundle schema
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    totalprice: {
        type: Number,
        required: true,
        default: 0
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;