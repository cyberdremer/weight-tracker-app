const prisma = require("../config/prismaclient");
const { validationResult } = require("express-validator");
const { loginValidation } = require("../validators/validators");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const ErrorWithStatusCode = require("../errors/statuscode");
const e = require("express");

const loginController = [
  loginValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }

    passport.authenticate("local", { session: true }, (err, user, info) => {
      if (err) {
        return next(new ErrorWithStatusCode(err.msg, 500));
      }
      if (!user) {
        return next(new ErrorWithStatusCode("Invalid credenitals", 400));
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({
          data: {
            message: "Login Succesfull!",
            status: 200,
          },
        });
      });
    })(req, res, next);
  }),
];

module.exports = loginController;
