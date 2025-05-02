const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { createWeightEntryValidation } = require("../validators/validators");
const prisma = require("../config/prismaclient");
const ErrorWithStatusCode = require("../errors/statuscode");

// TODO Add authentication when done mocking

const postWeightEntry = [
  createWeightEntryValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }
    await prisma.weightEntries.upsert({
      where: {
        ownerid: req.user.id,
      },
      update: {
        weight: req.body.weight,
        notes: req.body.notes,
      },
      create: {
        createdat: new Date(req.body.date).getDate(),
        weight: req.body.weight,
        notes: req.body.notes,
      },
    });

    res.status(201).json({
      data: {
        message: `You have added/updated your entry for ${req.body.date}`,
        status: 201,
      },
    });
  }),
];


module.exports = postWeightEntry
