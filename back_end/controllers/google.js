const passportconfig = require("../config/passportconfig");
const asyncHandler = require("express-async-handler");
const passport = require("../config/passportconfig");
const ErrorWithStatusCode = require("../errors/statuscode");
const frontendUrl = require("../url");


const googleSignupController = asyncHandler(async (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
});
const googleLoginController = asyncHandler(async (req, res, next) => {
  passport.authenticate("google", { session: true }, (err, user, info) => {
    if (err) {
      return next(new ErrorWithStatusCode(err.msg, 500));
    }
    if (!user) {
      return next(new ErrorWithStatusCode("Google authentication failed", 400));
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect(`${frontendUrl}login/dashboard`);
    });
  })(req, res, next);
});


module.exports = {googleLoginController, googleSignupController}


