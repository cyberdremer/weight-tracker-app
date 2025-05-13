const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    error: {
      messsage: "Your are not authorized to view this resource!",
      status: 401,
    },
  });
};


module.exports = ensureAuthenticated;
