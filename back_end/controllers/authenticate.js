const ensureAuthenticated = require("../middleware/authenticated");
const asyncHandler = require("express-async-handler");
const authCheck = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    res.status(201).json({
      data: {
        message: "You are authenticated!",
        status: 201,
        user: {
          fullname: req.user.fullname,
          height: req.user.height,
          id: req.user.id,
          isImperial: req.user.isImperial,
        },
        auth: req.isAuthenticated(),
      },
    });
  }),
];

module.exports = authCheck;
