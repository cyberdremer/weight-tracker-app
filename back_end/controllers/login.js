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

    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/unauthorized",
    });
  }),
];

module.exports = loginController;
