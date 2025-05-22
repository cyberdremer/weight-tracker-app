const prisma = require("./prismaclient");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const session = require("express-session");
require("dotenv").config();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "dev" ? false : true,
    sameSite: process.env.NODE_ENV === "dev" ? "lax" : "none",
    httpOnly: process.env.NODE_ENV === "dev" ? false : true,
  },

  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: false,
    dbRecordIdFunction: undefined,
    logger: console,
  }),
});

module.exports = sessionConfig;
