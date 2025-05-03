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

    passport.authenticate("local", { session: true })(req, res, next);

    // res.status(200).json({
    //   data: {
    //     message: `${req.body.email} has logged in!`,
    //     status: 200,
    //   },
    // });
  }),
];

module.exports = loginController;
