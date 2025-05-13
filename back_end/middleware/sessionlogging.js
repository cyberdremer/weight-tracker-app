const sessionLogger = (req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session Data:", req.session);
  console.log("User: ", req.user);

  console.log(
    `Session ID: ${req.sessionID}\nSession Data: ${req.session}\nUser:${req.user}`
  );
  next();
};

module.exports = sessionLogger;
