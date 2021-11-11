const Product = require("../../models/product.model");

const getProductBySKUOrId = async ({ id, SKU }) => {
  const _id = id;
  const query = _id ? { _id } : { SKU };
  // get all data from table
  const product = await Product.findOne(query);

  return product;
};

module.exports = getProductBySKUOrId;
