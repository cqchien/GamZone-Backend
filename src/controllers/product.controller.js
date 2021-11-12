const httpStatus = require('http-status')
const Exception = require('../utils/exception')
const handleSuccess = require('../utils/successfulHandler')
const createNewProduct = require('../services/product/create.product')
const getProductBySKUOrId = require('../services/product/getOne.product')
const getProductsList = require('../services/product/getAll.product')
const updateProduct = require('../services/product/update.product')

const createProduct = async (req, res, next) => {
    const { name, price,shortDescription,SKU,quantity } = req.body;
    try {
      // Check whether SKU is available
      const product = await getProductBySKUOrId({ SKU });
      if (product) {
        throw new Exception(httpStatus.CONFLICT, 'SKU has already taken');
      }
  
      // Create new User
      const newProduct = await createNewProduct({
        name, price,shortDescription,SKU,quantity
      });
  

    return handleSuccess(res, {newProduct}, httpStatus.CREATED)
    } catch (error) {
      next(error);
    }
  };

const getAllProducts = async(req,res,next) => {
    try {
        const productList = await getProductsList()

        return handleSuccess(res, {productList}, httpStatus.CREATED)
    }
    catch(err){
        next(err)
    }
}

const updateProductInfo = async(req,res,next) => {
  try{
    const productID = req.params.id
    const updatedData = req.body

    const updatedProduct = updateProduct(productID,updatedData)
    
    return handleSuccess(res,{updateProduct}, httpStatus.CREATED)
  }
  catch(err){
    next(err)
  }
}
module.exports = {createProduct, getAllProducts, updateProductInfo}