const prisma = require("./prismaclient");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const expressionSession = require("express-session");
require("dotenv").config();

const sessionConfig = expressionSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    secure: false
    // sameSite:"none",
    // httpOnly: true,
    // secure: false,
  },
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

module.exports = sessionConfig;
