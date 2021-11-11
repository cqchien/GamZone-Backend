const httpStatus = require("http-status");
const Exception = require("../utils/exception");

const authorize =
  (roles = []) =>
  (req, res, next) => {
    const { role } = req.user;

    if (typeof roles === "string") {
      roles = [roles];
    }

    if (roles.length && !roles.includes(role)) {
      next(new Exception(httpStatus.FORBIDDEN, "You Do not Permission"));
    }

    next();
  };

module.exports = authorize;
