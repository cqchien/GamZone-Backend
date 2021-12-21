const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specificationSchema = new Schema({

  product: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  desc: {
    type: String,
    trim: true,
  },

});


const SpecificationModel = mongoose.model('specification', specificationSchema, 'specifications');

module.exports = SpecificationModel;
