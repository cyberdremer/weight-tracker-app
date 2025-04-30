const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const determineEnvironment = () => {
  let databaseUrl;
  if (process.env.NODE_ENV === "test") {
    databaseUrl = process.env.TEST_DATABASE_URL;
  } else if (process.env.NODE_ENV === "dev") {
    databaseUrl = process.env.DEV_DATABASE_URL;
  } else {
    databaseUrl = process.env.DATABASE_PUBLIC_URL;
  }
  return databaseUrl;
};

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: determineEnvironment(),
    },
  },
});


module.exports = prisma;
