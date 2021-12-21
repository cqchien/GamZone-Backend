const bcrypt = require("bcryptjs");
const AdminModel = require("../../models/admin.model");
const CustomerModel = require("../../models/customer.model");

const createCustomer = async ({ name, password, email, role }) => {
  const hash = bcrypt.hashSync(password, 10);
  const newCustomer = await CustomerModel.create({
    name,
    password: hash,
    email,
  });

  return newCustomer;
};

module.exports = createCustomer;
