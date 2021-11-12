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
    name: Joi.string().required().empty(''),
    price: Joi.string().required().empty(''),
    description: Joi.string().required().empty(''),
    shortDescription: Joi.string().required().empty(''),
    SKU: Joi.string().required().empty(''),
    quantity: Joi.number().required().empty(''),
    images: Joi.array().items(Joi.string()).required().empty('')
  }),
};

module.exports = { createProductValidationSchema, updateProductValidationSchema };
