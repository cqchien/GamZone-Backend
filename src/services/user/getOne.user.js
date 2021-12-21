const AdminModel = require("../../models/admin.model");
const CategoryModel = require("../../models/category.model");
const CustomerModel = require("../../models/customer.model");
const ProductModel = require("../../models/product.model");

const getCustomerByEmailOrId = async ({ id, email, type }) => {
  const _id = id;
  const query = _id ? { _id } : { email };
  // get all data from table without password
  const model = type === 'admin' ? AdminModel : CustomerModel;
  const user = await model.findOne(query);

  // await ProductModel.create({
  //   SKU: 'SKU22122021', name: 'Laptop Apple MacBook Pro 2018 13.3" MR9R2 (13.3"/Core i5/8GB/Iris Plus 650/macOS)', price: 49890000 , brand: 'APPLE',
  //   desc: 'MacBook Pro nâng tầm khái niệm notebook lên một tầm cao mới, với hiệu năng và tính di động chuẩn mực. Cùng phác họa và phát triển ý tưởng của bạn nhanh hơn bao giờ hết, nhờ có sự hỗ trợ của vi xử lý hiệu năng cao cùng với bộ nhớ, dung lượng lưu trữ và đồ họa tân tiến.',
  //   category: '61c201117b511b5923fdb52e',
  //   quantity: 5,
  //   images: 'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1609819999/products/SKU200500856/qos7n5ffrx3q2bdvzwo6.webp'
  // })

  return user;
};

module.exports = getCustomerByEmailOrId