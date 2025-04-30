const prisma = require("../config/prismaclient");
const { validationResult } = require("express-validator");
const { loginValidation } = require("../validators/validators");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const ErrorWithStatusCode = require("../errors/statuscode");

const loginController = [
  loginValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }

    passport.authenticate("local", async (err, user, info) => {
      if (err) next(new ErrorWithStatusCode(err, 500));
      if (!user) return next(new ErrorWithStatusCode("User not found!", 400));
      res.status(200).json({
        data: {
          message: `${user.email}: signing in!`,
          authenicated: true
        },
      });
    })(req, res, next);
  }),
];

module.exports = loginController;
