const { Router } = require("express");
const accountRoute = Router();
const {deleteAccount, updateAccount, onboardThirdPartyCredentialsAccount} = require("../controllers/account");

accountRoute.delete("/delete", deleteAccount);
accountRoute.put("/update", updateAccount);
accountRoute.put("/thirdparty", onboardThirdPartyCredentialsAccount)

module.exports = accountRoute;
