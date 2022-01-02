const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Note: 1 record đơn hàng chỉ có 1 sản phẩm
const orderSchema = new Schema({
  // chủ đơn hàng
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'customer' },

  // địa chỉ giao nhận
  deliveryAddress: {
    type: String, required: true,
  },

  receiver: {
    type: String, required: true,
  },

  receiverPhone: {
    type: String, required: true,
  },


  // mã đơn hàng
  orderCode: { type: String, unique: true, required: true },
  
  // trạng thái đơn hàng
  // 0 - Đặt hàng thành công, 1 - TTB đã tiếp nhận, 2 - Đang lấy hàng, 3 - Đóng gói xong
  // 4 - Bàn giao vận chuyển, 5 - Đang vận chuyển, 6 - Giao hàng thành công, 7 - Hủy
  orderStatus: {
    type: Number,
    enum: [...Array(8).keys()],
    required: true,
    default: 0,
  },

  // hình thức thanh toán
  // 0 - thanh toán tiền mặt khi nhận hàng
  // 1 - thanh toán qua VNPay
  paymentMethod: { type: Number, required: true, enum: [0, 1], default: 0 },

  // phí vận chuyển
  transportFee: { type: Number, required: true, default: 0 },

  // hình thức giao hàng
  // 0 - tiêu chuẩn, 1 - tiết kiệm, 2 - nhanh
  transportMethod: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
    default: 0,
  },

  total: {
    type: Number,
    required: true,
    default: 0,
  },
  // ghi chú cho đơn hàng
  note: { type: String, trim: true, maxlength: 200 },
}, { timestamps: true }
);

const OrderModel = mongoose.model('order', orderSchema, 'orders');

module.exports = OrderModel;
