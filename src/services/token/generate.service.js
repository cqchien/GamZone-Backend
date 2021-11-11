const jwt = require("jsonwebtoken");
const { token: tokenConfig } = require("../../config/config");

const generateToken = (userId, role, type, expires) => {
  // TODO: get secret key of user from config.
  // NOTE: This likes the signature of user. Auth Server will check token base on this signature
  const sign = tokenConfig.secret;

  // TODO: Set payload to assign to token
  // NOTE: moment().unix(): to create a moment from a Unix timestamp
  const payload = {
    id: userId,
    role,
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, sign);
};

module.exports = generateToken;
