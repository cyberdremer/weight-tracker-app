const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/login");

loginRouter.post("/", loginController);
module.exports = loginRouter;
