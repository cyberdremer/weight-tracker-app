const { Router } = require("express");
const signupRouter = Router();
const createAccount = require("../controllers/signup");

signupRouter.post("/", createAccount);

module.exports = signupRouter;
