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
    name: Joi.string().empty(''),
    price: Joi.string().empty(''),
    description: Joi.string().empty(''),
    shortDescription: Joi.string().empty(''),
    SKU: Joi.string().empty(''),
    quantity: Joi.number().empty(''),
    images: Joi.array().items(Joi.string()).empty('')
  }),
};

module.exports = { createProductValidationSchema, updateProductValidationSchema };
