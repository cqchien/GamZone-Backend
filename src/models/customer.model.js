const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'BAN'],
      default: 'ACTIVE'
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model('customer', customerSchema, 'customers');

module.exports = CustomerModel;