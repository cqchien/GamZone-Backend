const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
