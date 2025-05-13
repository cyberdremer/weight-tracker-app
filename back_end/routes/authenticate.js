const { Router } = require("express");
const authenicateRouter = Router();
const authCheck = require("../controllers/authenticate");

authenicateRouter.get("/", authCheck);

module.exports = authenicateRouter;
