const { Router } = require("express");
const signupRouter = require("./signup");
const loginRouter = require("./login");
const weightRouter = require("./weight");
const accountRouter = require("./account");

const toplevelRouter = Router();
toplevelRouter.use("/signup", signupRouter);
toplevelRouter.use("/login", loginRouter);
toplevelRouter.use("/account", accountRouter);
toplevelRouter.use("/weight", weightRouter);

module.exports = toplevelRouter;
