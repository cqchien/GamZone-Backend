const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const createUser = async ({ name, password, email, role }) => {
  const hash = bcrypt.hashSync(password, 10);
  const newUser = await User.create({
    name,
    password: hash,
    role,
    email,
  });

  return newUser;
};

module.exports = createUser;
