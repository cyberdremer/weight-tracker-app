const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { updateAccountValidation } = require("../validators/validators");
const prisma = require("../config/prismaclient");
const ErrorWithStatusCode = require("../errors/statuscode");

const deleteAccount = [
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }
    const deletedAccount = await prisma.user.delete({
      where: {
        id: req.user.id,
      },
    });

    res.status(200).json({
      data: {
        message: `${deletedAccount.email} has succesfully been deleted!`,
        status: 200,
      },
    });
  }),
];

const updateAccount = [
  updateAccountValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }
    await prisma.user.update({
      where: {
        id: req.user.id,
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
