const prisma = require("./prismaclient");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const session = require("express-session");
require("dotenv").config();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "lax"
  },

  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: false,
    dbRecordIdFunction: undefined,
    logger: console 
  }),
});

module.exports = sessionConfig;
