const { Strategy } = require("passport-google-oauth20");
const prisma = require("../config/prismaclient");
const client = require("../config/openaiconfig");
require("dotenv").config();

const callbackURL =
  process.env.NODE_ENV === "dev"
    ? process.env.GOOGLE_CALLBACK_DEV_URL
    : process.env.GOOGLE_CALLBACK_PROD_URL;

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL,
};

const strategyImplementation = async (
  accessToken,
  refreshToke,
  profile,
  done
) => {
  try {
    const user = await prisma.user.upsert({
      where: {
        email: profile.emails[0].value,
      },
      update: {},
      create: {
        email: profile.emails[0].value,
        fullname: profile.displayName,
        passwordhash: null,
        isImperial: true,
      },
    });
    done(null, user);
  } catch (err) {
    done(null, false, { message: err.message });
  }
};

const googleStrategy = new Strategy(options, strategyImplementation);

module.exports = googleStrategy;
