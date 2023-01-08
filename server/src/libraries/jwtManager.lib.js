const jwt = require('jsonwebtoken');

/**
 * Generate jwt token
 * @param {Object} data jwt data payload object
 * @param {String} secret jwt sign secret
 * @param {Object} options jwt options payload
 */
const generateToken = (data, secret, options = {}) => {
  try {
    return jwt.sign(data, secret, options);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
};
