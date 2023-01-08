const authenticate = require('./auth.middleware');
const validate = require('./validate.middleware');

module.exports = {
  authenticate,
  validate,
};