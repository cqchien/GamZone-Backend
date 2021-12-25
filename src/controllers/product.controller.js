const httpStatus = require("http-status");
const ProductModel = require("../models/product.model");
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

module.exports = {
  getAllProducts,
};