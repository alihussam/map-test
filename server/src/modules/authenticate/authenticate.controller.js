const { UserModel } = require('../../models');
const { JWT } = require('../../config');
const {
  sendResponse,
  Factory: { ErrorFactory },
  JwtManager,
  Mappings: { Errors: { AccountErrors } },
  Constants: { UserRoles },
} = require('../../libraries');

/**
 * User login controller
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check if this user exist
    const data = await UserModel.findOne({ emailAddress: username });
    if (!data) {
      const error = ErrorFactory.getError(AccountErrors.ACCOUNT_NOT_FOUND);
      throw error;
    }

    // check accounts password
    if (!data.validPassword(password)) {
      const error = ErrorFactory.getError(AccountErrors.INVALID_LOGIN_CREDENTIALS);
      throw error;
    }

    // generate jwt
    const token = JwtManager.generateToken({
      profile: data.safeModel(),
      role: data.safeModel().role,
    }, JWT.SECRET, { expiresIn: JWT.EXPIRES_IN });

    //send response back to user
    res.json({
      token,
      code: 0,
      data: {
        ...data.safeModel(),
        id: data._id,
        userId: data._id,
        token,
      },
    });
    // sendResponse(res, null, { token, profile: data.safeModel() });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
