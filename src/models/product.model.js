const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Note: Lược đồ thông tin chung cho các loại sản phẩm
const productSchema = new Schema({
  // mã sản phẩm, vd: "SKU200500854"
  SKU: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    default: 0,
  },

  brand: { type: String, require: true, trim: true },

  images: {
    type: String,
    required: true,
    trim: true,
  },

  desc: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true, 
  },
  // số lượng sản phẩm tồn kho
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

// text search index
productSchema.index(
  { name: 'text', brand: 'text' },
  { name: 'ix_search_text', default_language: 'none' },
);

const ProductModel = mongoose.model('product', productSchema, 'products');

module.exports = ProductModel;
