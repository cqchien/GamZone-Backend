const Product = require('../../models/product.model')

const updateProduct = async({productID, params})=>{
    return Product.updateOne({_id: productID}, params)
}