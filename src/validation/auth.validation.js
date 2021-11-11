const Joi = require("joi");

const registerValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    role: Joi.string().empty(""),
  }),
};

const loginValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports = { registerValidationSchema, loginValidationSchema };
