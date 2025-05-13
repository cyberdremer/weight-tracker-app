const ensureAuthenticated = require("../middleware/authenticated");
const asyncHandler = require("express-async-handler");
const authCheck = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    res.status(201).json({
      data: {
        message: "You are authenticated!",
        status: 201,
        auth: req.isAuthenticated(),
      },
    });
  }),
];


module.exports = authCheck;