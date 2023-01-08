const { Joi } = require('express-validation');

/**
 * Login route validation
 */
const loginValidation = {
  body: Joi.object({
    origin: Joi
      .string()
      .required(),
    username: Joi
      .string()
      .required(),
    password: Joi
      .string()
      .required(),
  }),
};

/**
 * Export all
 */
module.exports = {
  loginValidation,
};
