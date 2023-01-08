const router = require('express').Router();
const {
  validate,
  authenticate,
} = require('../../middlewares');
const {
  login,
  getProfile,
  getParkings,
} = require('./authenticate.controller');
const {
  loginValidation,
} = require('./authenticate.validations');

/* Login Route, Path - /api/auth/login */
router.post('/',
  validate(loginValidation), login);

module.exports = router;