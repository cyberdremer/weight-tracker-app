const { Router } = require("express");
const oauthRouter = Router();
const {
  googleLoginController,
  googleSignupController,
} = require("../controllers/google");

oauthRouter.get("/google", googleSignupController);
oauthRouter.get("/google/callback", googleLoginController);

module.exports = oauthRouter;
