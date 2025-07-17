const passport = require("passport");
const localStrategy = require("../strategy/local");
const googleStrategy = require("../strategy/google")
const prisma = require("../config/prismaclient");

passport.use(localStrategy);
passport.use(googleStrategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        isImperial: true,
        height: true,
        id: true,
        fullname: true,
        dateofbirth: true,
        email: true,
      }
    });
    done(null, user);
  } catch (error) {
    done(err);
  }
});

module.exports = passport;
