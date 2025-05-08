const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { updateAccountValidation } = require("../validators/validators");
const prisma = require("../config/prismaclient");
const ErrorWithStatusCode = require("../errors/statuscode");
const ensureAuthenticated = require("../middleware/authenticated");

const deleteAccount = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }
    const deletedAccount = await prisma.user.delete({
      where: {
        id: req.session.passport.user,
      },
    });

    if (!deletedAccount) {
      throw new ErrorWithStatusCode("Account not found!", 404);
    }

    res.status(200).json({
      data: {
        message: `${deletedAccount.email} has succesfully been deleted!`,
        status: 200,
      },
    });
  }),
];

const updateAccount = [
  ensureAuthenticated,
  updateAccountValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }
    await prisma.user.update({
      where: {
        id: req.session.passport.user,
      },
      data: {
        dob: req.body.dob,
        isImperial: req.body.units === "lbs" ? true : false,
      },
    });

    res.status(204).json({
      data: {
        message: `User account succesfully updated!`,
        status: 204,
      },
    });
  }),
];

module.exports = { deleteAccount, updateAccount };
