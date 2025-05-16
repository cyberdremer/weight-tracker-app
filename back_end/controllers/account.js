const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  updateAccountValidation,
  deleteAccountValidation,
} = require("../validators/validators");
const prisma = require("../config/prismaclient");
const ErrorWithStatusCode = require("../errors/statuscode");
const ensureAuthenticated = require("../middleware/authenticated");
const bcryptjs = require("bcryptjs");

const deleteAccount = [
  ensureAuthenticated,
  deleteAccountValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }

    const accountToDelete = await prisma.user.findFirstOrThrow({
      where: {
        id: req.user.id,
      },
    });

    const passwordMatch = await bcryptjs.compare(
      req.body.password,
      accountToDelete.passwordhash
    );
    if (!passwordMatch) {
      throw new ErrorWithStatusCode("Incorrect Credentials!", 404);
    }

    if (!accountToDelete) {
      throw new ErrorWithStatusCode("Account not found!", 404);
    }

    const deletionPromise = Promise.all([
      await prisma.dietEntries.deleteMany({
        where: {
          ownerid: req.user.id,
        },
      }),
      await prisma.weightEntries.deleteMany({
        where: {
          ownerid: req.user.id,
        },
      }),
    ]);

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
  ensureAuthenticated,
  updateAccountValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }

    const height =
      req.user.isImperial === true ? req.body.height * 2.5 : req.body.height ;
    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        height: height,
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
