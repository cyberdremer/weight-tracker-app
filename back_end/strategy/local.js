const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prismaclient");

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

    if (!user) {
      return done(null, false, { message: "Incorrect email!" });
    }
    const match = await bcrypt.compare(password, user.passwordhash);
    if (!match) {
      return done(null, false, { message: "Incorrect credentials" });
    }

    return done(null, user);
  } catch (error) {
    done(error);
  }
};



const localStrategy = new Strategy(options, strategyImplementation);


module.exports = localStrategy;
