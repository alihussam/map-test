const jwt = require('jsonwebtoken');
const { JWT } = require('../config');
const {
  Factory: { ErrorFactory },
  Mappings: { Errors: { JwtErrors } }
} = require('../libraries');

/**
 * Auth middleware to check jwt token in headers
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express next middleware
 */
module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization || req.headers.Authorization;
    token = token.replace("Bearer ","")
    if (!token) {
      const error = ErrorFactory.getError(JwtErrors.JWT_MISSING);
      throw error;
    }
    jwt.verify(token, JWT.SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          const error = ErrorFactory.getError(JwtErrors.JWT_EXPIRED);
          throw error;
        }
        const error = ErrorFactory.getError(JwtErrors.JWT_INVALID);
        throw error;
      }
      if (!req.body) req.body = {};
      req.profile = decoded.profile;
      req.role = decoded.role;
    });
    next();
  } catch (error) {
    next(error);
  }
};
