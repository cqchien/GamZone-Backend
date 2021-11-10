const { string, required } = require('joi');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
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
    SKU:{
        type: String,
        required: true,
    },
    rating:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    images:{
        info:[
            { type: string,
            required: true, 
            }
            ],
        required: true
    }
  },
  { timestamps: true }, 
);

module.exports = mongoose.model('Product', productSchema);
