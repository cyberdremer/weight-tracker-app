const { Router } = require("express");
const accountRoute = Router();
const {deleteAccount, updateAccount} = require("../controllers/account");

accountRoute.delete("/delete", deleteAccount);
accountRoute.put("/update", updateAccount);

module.exports = accountRoute;
