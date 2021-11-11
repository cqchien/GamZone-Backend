const moment = require('moment');
const { token: tokenConfig } = require('../../config/config');
const tokenTypes = require('../../constant/token');
const generateToken = require('./generate.service');
const saveToken = require('./save.service');

const generateAuthToken = async ({ _id, role }) => {
  const userId = _id;
  // TODO:Set the time expiration for access and refresh token
  // NOTE: moment().add(): Adding time to an existing moment
  const accessTokenExpires = moment().add(tokenConfig.accessExpiration, 'minutes');


  // TODO: Generate token
  // NOTE: Use jwt.sign() to create new token
  const accessToken = generateToken(userId, role, tokenTypes.ACCESS, accessTokenExpires);

  // return data
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    }
  };
};

module.exports = generateAuthToken;