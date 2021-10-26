const Joi = require('joi');

const registerValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  password: Joi.string().required(),
  dob: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required().email(),
  avatar: Joi.string().required()
});

const loginValidationSchema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

module.exports = {registerValidationSchema, loginValidationSchema}