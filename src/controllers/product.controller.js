const httpStatus = require("http-status");
const ProductModel = require("../models/product.model");
const SpecificationModel = require("../models/specification.model");
const Exception = require("../utils/exception");
const handleSuccess = require("../utils/successfulHandler");

// api: Lấy tất cả sản phẩm và phân trang
const getAllProducts = async (req, res, next) => {
  try {
    let { page, perPage } = req.query;
    if (!page) page = 1;
    if (!perPage) perPage = 8;
    // lấy toàn bộ danh sách cho trang admin
    if (parseInt(page) === -1) {
      const result = await ProductModel.find().populate('category');

      return handleSuccess(res, { data: result }, httpStatus.OK);
    } else {
      const nSkip = (parseInt(page) - 1) * perPage;
      const numOfProduct = await ProductModel.countDocuments();
      const result = await ProductModel.find().populate('category')
        .skip(nSkip)
        .limit(parseInt(perPage))
        .select('-otherInfo -code');

      return handleSuccess(res, { count: numOfProduct, data: result }, httpStatus.OK);
    }
  } catch (error) {
    next(error);
  }
};

// api: Lấy 1 sản phẩm theo id
const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Lấy tổng quan sản phẩm
    let product = await ProductModel.findOne({ _id: id }).populate('category');

    if (!product) {
      throw new Exception(
        httpStatus.NOT_FOUND,
        "Product Not Found"
      );
    }
    // Lấy mô tả sản phẩm
    const productSpecifications = await SpecificationModel.find({
      product: product._id
    }).select('-_id -product -__v');

    // Trả về
    return handleSuccess(res, { product, specifications: productSpecifications }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProduct
};