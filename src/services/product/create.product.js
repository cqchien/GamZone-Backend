const Product = require("../../models/product.model");
//name, password, dob, address, phone, email, avatar
const createProduct = async ({
  name,
  price,
  description,
  shortDescription,
  SKU,
  rating,
  quantity,
  image,
}) => {
  const newProduct = await Product.create({
    name,
    price,
    description,
    shortDescription,
    SKU,
    rating,
    quantity,
    image,
  });

  return newProduct;
};

module.exports = createProduct;
