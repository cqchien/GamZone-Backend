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

module.exports = { createProductValidationSchema };
