const bcrypt = require("bcryptjs");
require("dotenv").config();

const saltLength = Number(process.env.SALT_LENGTH) || 16;
const passwordHasher = (password) => {
  return bcrypt.hash(password, saltLength);
};


module.exports = passwordHasher;
