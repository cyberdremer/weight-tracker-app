const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prismaclient");
require("dotenv").config();

const options = {
  usernameField: "email",
};

const strategyImplementation = async (email, password, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const passwordHashToMatch =
      user === null ? process.env.DEFAULT_PASSWORD_HASH : user.passwordhash;

    const match = await bcrypt.compare(password, passwordHashToMatch);
    if (!user) {
      return done(null, false, { message: "Invalid Credentials" });
    }
    if (!match) {
      return done(null, false, { message: "Invalid credentials" });
    }

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

const localStrategy = new Strategy(options, strategyImplementation);

module.exports = localStrategy;
