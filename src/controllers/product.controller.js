const httpStatus = require('http-status')
const Exception = require('../utils/exception')
const handleSuccess = require('../utils/successfulHandler')
const createProduct = require('../services/product/create.product')

const createProduct = async (req, res, next) => {
    const { name, password, email } = req.body;
    try {
      // Check Email
      const user = await getUserByEmailOrId({ email });
      if (user) {
        throw new Exception(httpStatus.CONFLICT, 'Email Already Taken');
      }
  
      // Create new User
      const newUser = await createUser({
        name, password, email
      });
  
    // Create token
    const token = await generateAuthToken(newUser)

    return handleSuccess(res, {token}, httpStatus.CREATED)
    } catch (error) {
      next(error);
    }
  };