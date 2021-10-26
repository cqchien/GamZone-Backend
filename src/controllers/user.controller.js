const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const getUserByEmailOrId = require('../services/user/getOne.user')
const Exception = require('../utils/exception')
const handleSuccess = require('../utils/successfulHandler')
const createUser = require('../services/user/create.user')

const register = async (req, res, next) => {
    const { name, password, dob, address, phone, email, avatar } = req.body;
    try {
      console.log(req.body)
      // Check Email
      const user = await getUserByEmailOrId({ email });
      if (user) {
        throw new Exception(httpStatus.CONFLICT, 'Email Already Taken');
      }
  
      // Create new User
      const newUser = await createUser({
        name, password, dob, address, phone, email, avatar
      });
  
      // Create Token NOT CREATED YET
    //   const token = await generateAuthToken(newUser);
  
    return handleSuccess(res, {}, httpStatus.OK, 'Reset Password Successfully');
    } catch (error) {
      next(error);
    }
  };

  module.exports = register