/**
 * Response Handler to send response in case of request success
 * Using this handler ensures that system has consistent response pattern
 * @param {object} res express response object
 * @param {string} successCode success code for request if available
 * @param {object} data response data for request
 * @param {any} meta any additional data in api
 */
module.exports = (res, successCode, data, meta) => {
  res.json({
    code: 0,
    successCode,
    data,
    meta
  });
};
