const logOutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      res.status(404).json({
        error: {
          message: "There has been an error in logging out! Please try again!",
          status: 404,
        },
      });
    } else {
      res.status(200).json({
        data: {
          message: "You are succesfully logged out",
          status: 200,
        },
      });
    }
  });
};


module.exports = logOutUser;