const Product = require("../../models/product.model");
//name, password, dob, address, phone, email, avatar
const getALlProducts = async () => {
  const productsList = await Product.find();
  return productsList;
};

module.exports = getALlProducts;
