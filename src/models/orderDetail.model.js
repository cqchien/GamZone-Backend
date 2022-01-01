const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
  order: { type: Schema.Types.ObjectId, required: true, ref: 'order' },
  product: { type: Schema.Types.ObjectId, required: true, ref: 'product' },

  // địa chỉ giao nhận
  quantity: {
    type: Number, required: true, default: 1
  }
}, { timestamps: true }
);

const OrderDetailModel = mongoose.model('orderDetail', orderDetailSchema, 'orderDetails');

module.exports = OrderDetailModel;
