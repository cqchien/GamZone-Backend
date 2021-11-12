const Product = require('../../models/product.model')

const updateProduct = async({productID, updatedData})=>{
    return Product.updateOne({_id: productID}, updatedData)
}

module.exports = updateProduct