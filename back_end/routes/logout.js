const { Router } = require("express");
const logoutRouter = Router();
const logOutUser = require("../controllers/logout");

logoutRouter.post("/", logOutUser);

module.exports = logoutRouter;
