const express = require("express");
const cors = require("cors");
require("dotenv").config();
const expressionSession = require("./config/session");
const passport = require("./config/passportconfig");
const errorHandler = require("./middleware/errorhandler");
const toplevelRouter = require("./routes/toplevel");
const app = express();
const sessionLogger = require("./middleware/sessionlogging");

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      process.env.ORIGIN_URL,
    ],
    exposedHeaders: ["set-cookie"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressionSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(sessionLogger);
app.use(toplevelRouter);

app.use(errorHandler);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
