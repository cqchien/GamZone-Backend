const tokenModel = require('../../models/token.model');


const saveToken = async ({
  token, user, type, expires,
}) => {
  const newToken = await tokenModel.create({
    token,
    user,
    type,
    expires,
  });
  return newToken;
};

module.exports = saveToken;