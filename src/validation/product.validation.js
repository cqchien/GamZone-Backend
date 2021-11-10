const Joi = require('joi');

const createProductValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.string().required(),
  shortDescription: Joi.string().required(),
  SKU: Joi.string().required(),
  quantity: Joi.string().required()
});

module.exports = {createProductValidationSchema}