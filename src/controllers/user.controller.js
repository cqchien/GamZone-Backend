const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const getUserByEmailOrId = require('../services/user/getOne.user')

const register = async (req, res, next) => {
    const { email, password, name } = req.body;
    try {
      // Check Email
      const user = await getUserByEmailOrId({ email });
      if (user) {
        throw new Exception(httpStatus.CONFLICT, 'Email Already Taken');
      }
  
      // Create new User
      const newUser = await createUser({
        email,
        name,
        password,
      });
  
      // Create Token
      const token = await generateAuthToken(newUser);
  
      return handleSuccess(res, { token }, httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  };