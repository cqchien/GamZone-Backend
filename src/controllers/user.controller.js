const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const getUserByEmailOrId = require("../services/user/getOne.user");
const Exception = require("../utils/exception");
const handleSuccess = require("../utils/successfulHandler");
const createUser = require("../services/user/create.user");
const generateAuthToken = require("../services/token/generateAuth.Service");

const register = async (req, res, next) => {
  const { name, password, email, role } = req.body;
  try {
    // Check Email
    const user = await getUserByEmailOrId({ email });
    if (user) {
      throw new Exception(httpStatus.CONFLICT, "Email Already Taken");
    }

    // Create new User
    const newUser = await createUser({
      name,
      password,
      email,
      role,
    });

    // Create token
    const token = await generateAuthToken(newUser);

    return handleSuccess(res, { ...token }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check Email
    const user = await getUserByEmailOrId({ email });
    const userPassword = user?.password ? user.password : "";
    // check password whether match or not
    const isMatchPassword = await bcrypt.compare(password, userPassword);
    if (!isMatchPassword || !user) {
      throw new Exception(
        httpStatus.UNAUTHORIZED,
        "Incorrect Email Or Password"
      );
    }

    // create token
    const token = await generateAuthToken(user);

    return handleSuccess(res, { token }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check Email
    const user = await getUserByEmailOrId({ email, type: 'admin' });
    const userPassword = user?.password ? user.password : "";
    // check password whether match or not
    const isMatchPassword = await bcrypt.compare(password, userPassword);
    if (!isMatchPassword || !user) {
      throw new Exception(
        httpStatus.UNAUTHORIZED,
        "Incorrect Email Or Password"
      );
    }

    // create token
    const token = await generateAuthToken(user);

    return handleSuccess(res, { token, admin: user }, httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getUserByEmailOrId({ id: userId });
    if (!user) {
      throw new Exception(httpStatus.NOT_FOUND, "User Not Found");
    }

    return handleSuccess(res, { user }, httpStatus.OK);
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login, getProfile, loginAdmin };
