require("dotenv").config();

const frontendUrl =
  process.env.NODE_ENV == "dev"
    ? process.env.DEV_FRONTEND_URL
    : process.env.ORIGIN_URL;



module.exports = frontendUrl;