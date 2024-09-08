const mongoose = require('mongoose');

// Skema Bundle
const bundleSchema = new mongoose.Schema({
    bundle_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    totalprice: {
        type: Number,
        required: true,
        default: 0
    },
    products: [{
        type: String,
        ref: 'Product', 
        required: true
    }]
});

const Bundle = mongoose.model('Bundle', bundleSchema);

module.exports = Bundle;