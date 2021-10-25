const Joi = require('joi');

const registerValidationSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
});

module.exports = registerValidationSchema