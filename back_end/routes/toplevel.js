const { Router } = require("express");
const signupRouter = require("./signup");
const loginRouter = require("./login");
const weightRouter = require("./weight");
const accountRouter = require("./account");
const logoutRouter = require("./logout");
const dieticianRouter = require("./dietician");
const authenticateRouter = require("./authenticate");

const toplevelRouter = Router();
toplevelRouter.use("/signup", signupRouter);
toplevelRouter.use("/login", loginRouter);
toplevelRouter.use("/account", accountRouter);
toplevelRouter.use("/weight", weightRouter);
toplevelRouter.use("/logout", logoutRouter);
toplevelRouter.use("/dietician", dieticianRouter);
toplevelRouter.use("/authenticate", authenticateRouter);
module.exports = toplevelRouter;
