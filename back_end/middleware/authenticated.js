const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(404).json({
    error: {
      messsage: "Your are not authorized to view this resource!",
      status: 404,
    },
  });
};


module.exports = ensureAuthenticated;
