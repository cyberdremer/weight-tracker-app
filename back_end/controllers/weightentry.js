const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { createWeightEntryValidation } = require("../validators/validators");
const prisma = require("../config/prismaclient");
const passport = require("../config/passportconfig");
const ErrorWithStatusCode = require("../errors/statuscode");
const ensureAuthenticated = require("../middleware/authenticated");

// TODO Add authentication when done mocking

const postWeightEntry = [
  ensureAuthenticated,
  createWeightEntryValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }

    const userId = req.session.passport.user;

    const entry = await prisma.weightEntries.findFirst({
      where: {
        ownerid: userId,
        createdat: new Date(req.body.date),
      },
    });

    if (entry) {
      // TODO Update an existing entry
      await prisma.weightEntries.update({
        where: {
          ownerid: userId,
          id: entry.id,
        },
        data: {
          weight: req.body.weight,
          notes: req.body.notes,

          createdat: entry.createdat,
        },
      });

      res.status(200).json({
        data: {
          message: `You have updated your entry for ${req.body.date}`,
          status: 200,
        },
      });
    } else {
      // TODO Create a new entry
      await prisma.weightEntries.create({
        data: {
          ownerid: userId,
          notes: req.body.notes,
          createdat: new Date(req.body.date),
          weight: req.body.weight,
        },
      });

      res.status(201).json({
        data: {
          message: `You have added your entry for ${req.body.date}`,
          status: 201,
        },
      });
    }
  }),
];

const deleteWeightEntry = [
  // TODO add a validator that actually works for validating the date
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    const dateToDelete = new Date(
      +req.params.year,
      +req.params.month - 1,
      +req.params.day
    );
    const userId = req.session.passport.user;
    await prisma.weightEntries.delete({
      where: {
        createdat: dateToDelete,
        ownerid: userId,
      },
    });

    res.status(204).json({
      data: {
        message: `The entry for ${dateToDelete} has been succesfully delete!`,
        status: 204,
      },
    });
  }),
];

module.exports = postWeightEntry;
