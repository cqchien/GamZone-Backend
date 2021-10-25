const Joi = require('joi');

const registerValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required()
});

const loginValidationSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

module.exports = {registerValidationSchema, loginValidationSchema}