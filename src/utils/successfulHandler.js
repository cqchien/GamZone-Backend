const handleSuccess = (res, data, statusCode, message = '', pagination = {}) => res.status(statusCode).send({
    success: true,
    statusCode,
    data,
    message,
    pagination,
  })
  
  module.exports = handleSuccess

  