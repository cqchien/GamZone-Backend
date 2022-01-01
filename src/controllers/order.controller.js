const httpStatus = require("http-status");
const OrderModel = require("../models/order.model");
const ProductModel = require("../models/product.model");
const OrderDetailModel = require("../models/orderDetail.model");
const Exception = require("../utils/exception");
const generateVerifyCode = require("../utils/generateCodeOrder");
const handleSuccess = require("../utils/successfulHandler");

const createOrder = async (req, res, next) => {
  const { owner, deliveryAddress, receiver, receiverPhone, orderProds, paymentMethod, transportFee, transportMethod, note } = req.body;
  try {
    let totalMoney = 0;
    for (let i = 0; i < orderProds.length; ++i) {
      const { numOfProd, product } = orderProds[i];
      const productDetail = await ProductModel.findOne({ _id: product });
      if (!productDetail) {
        throw new Exception(httpStatus.NOT_FOUND, "Product not found");
      }
      if (productDetail.quantity < parseInt(numOfProd)) {
        throw new Exception(httpStatus.BAD_REQUEST, "Product is out of stock");
      }

      await ProductModel.updateOne(
        { _id: product },
        { quantity: productDetail.quantity - parseInt(numOfProd) },
      );
      totalMoney += productDetail.price * numOfProd;
    };

    const order = await OrderModel.create({
      owner,
      deliveryAddress,
      receiver,
      receiverPhone,
      orderCode: generateVerifyCode(6),
      paymentMethod,
      transportFee,
      transportMethod,
      total: totalMoney * 110 / 100 + transportFee,
      note,
    });
    for (let i = 0; i < orderProds.length; ++i) {
      const { numOfProd, product } = orderProds[i];
      await OrderDetailModel.create({
        order: order._id,
        product: product,
        quantity: numOfProd
      })
    }

    return handleSuccess(res, { order }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

const getListOrdersOfCustomer = async (req, res, next) => {
  try {
    const { id } = req.user;
    const orders = await OrderModel.find({ owner: id });
    let orderList = [];
    for (let index = 0; index < orders.length; index++) {
      const orderId = orders[index]._id;
      const orderDetail = await OrderDetailModel.find({ order: orderId }).populate('product');

      const dataFormat = {
        ...orders[index]._doc,
        orderProds: orderDetail.map((order) => {
          return { product: order.product, numOfProd: order.quantity }
        }),
      };
      orderList.push(dataFormat);
    }
    return handleSuccess(res, { orderList }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

const getOrderDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderInfo = await OrderModel.findOne({ _id: id });
    if (!orderInfo) {
      throw new Exception(httpStatus.NOT_FOUND, 'Order not found');
    }
    const order = [];
    const orderDetail = await OrderDetailModel.find({ order: orderInfo._id }).populate('product');

      const dataFormat = {
        ...orderInfo._doc,
        orderProds: orderDetail.map((order) => {
          return { product: order.product, numOfProd: order.quantity }
        }),
      };
      order.push(dataFormat);
    return handleSuccess(res, { order }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};


module.exports = { createOrder, getListOrdersOfCustomer, getOrderDetail }
