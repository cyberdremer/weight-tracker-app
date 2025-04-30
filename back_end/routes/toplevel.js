const { Router } = require("express");
const signupRouter = require("./signup");
const loginRouter = require("./login");

const toplevelRouter = Router();
toplevelRouter.use("/signup", signupRouter);
toplevelRouter.use("/login", loginRouter);

module.exports = toplevelRouter;
