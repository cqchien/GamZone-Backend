const httpStatus = require('http-status')
const Exception = require('../utils/exception')
const handleSuccess = require('../utils/successfulHandler')
const createProduct = require('../services/product/create.product')
const getProductBySKUOrId = require('../services/product/getOne.product')
const createProduct = async (req, res, next) => {
    const { name, price,shortDescription,SKU,quantity } = req.body;
    try {
      // Check whether SKU is available
      const product = await getProductBySKUOrId({ SKU });
      if (product) {
        throw new Exception(httpStatus.CONFLICT, 'SKU has already taken');
      }
  
      // Create new User
      const newProduct = await createProduct({
        name, price,shortDescription,SKU,quantity
      });
  

    return handleSuccess(res, {newProduct}, httpStatus.CREATED)
    } catch (error) {
      next(error);
    }
  };