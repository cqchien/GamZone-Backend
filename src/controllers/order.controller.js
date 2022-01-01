const httpStatus = require("http-status");
const OrderModel = require("../models/order.model");
const ProductModel = require("../models/product.model");
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
      totalMoney += productDetail.price
    };

    const order = await OrderModel.create({
      owner,
      deliveryAddress,
      receiver,
      receiverPhone,
      orderCode: generateVerifyCode(6),
      orderProds,
      paymentMethod,
      transportFee,
      transportMethod,
      total: totalMoney,
      note,
    });
    return handleSuccess(res, { order }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

const getListOrdersOfCustomer = async (req, res, next) => {
  try {
    const { id } = req.user;
    const orderList = await OrderModel.find({ owner: id }).populate('orderProds.product');

    return handleSuccess(res, { orderList }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

const getOrderDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findOne({ _id: id }).populate('orderProds.product');
    if (!order) {
      throw new Exception(httpStatus.NOT_FOUND, 'Order not found');
    }
    return handleSuccess(res, { order }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};


module.exports = { createOrder, getListOrdersOfCustomer, getOrderDetail }
