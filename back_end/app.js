const express = require("express");
const cors = require("cors");
require("dotenv").config();
const expressionSession = require("./config/session");
const passport = require("./config/passportconfig");
const errorHandler = require("./middleware/errorhandler");
const toplevelRouter = require("./routes/toplevel");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(expressionSession);
app.use(passport.session());
app.use(toplevelRouter);

app.use(errorHandler);
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
