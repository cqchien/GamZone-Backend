const { string } = require("joi");
const Joi = require("joi");

const createProductValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.string().required(),
    shortDescription: Joi.string().required(),
    SKU: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
};

const updateProductValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string(),
    price: Joi.string(),
    description: Joi.string(),
    shortDescription: Joi.string(),
    SKU: Joi.string(),
    quantity: Joi.number(),
    images: Joi.array().items(Joi.string())
  }),
};

module.exports = { createProductValidationSchema, updateProductValidationSchema };
