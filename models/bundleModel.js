const mongoose = require('mongoose');

const bundleSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Bundle = mongoose.model('Bundle', bundleSchema);

module.exports = Bundle;
