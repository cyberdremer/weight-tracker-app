const asyncHandler = require("express-async-handler");
const ensureAuthenticated = require("../middleware/authenticated");
const { dietValidation } = require("../validators/validators");
const { validationResult } = require("express-validator");
const prisma = require("../config/prismaclient");
const openai = require("../config/openaiconfig");
const ErrorWithStatusCode = require("../errors/statuscode");
const userDietPrompt = require("../prompts/prompt");
const { v4: uuidv4 } = require("uuid");

const postAiDietician = [
  ensureAuthenticated,
  dietValidation,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorWithStatusCode(errors.array()[0].msg, 400);
    }
    const todaysDate = new Date();
    const mostRecentWeight = await prisma.weightEntries.findFirst({
      where: {
        createdat: {
          lte: todaysDate,
        },
      },
    });

    if (!mostRecentWeight) {
      throw new ErrorWithStatusCode(
        "You must have prior weight entries so that I may understand your goals!",
        400
      );
    }

    const dietInfo = userDietPrompt(
      mostRecentWeight.weight,
      req.body.goal,
      req.body.diet
    );

    const response = await openai.responses.create({
      model: "o4-mini-2025-04-16",
      input: [
        {
          role: "system",
          content:
            "You are a professional dietician providing healthy and scientific accurate dietary advice based on the given dietary restrictions, current weight and weight goals. Provide a 7-day meal plan",
        },
        { role: "user", content: dietInfo },
      ],
    });

    res.status(203).json({
      data: {
        message: "Diet has been generated sucessfully!",
        status: 203,
        diet: response.output_text.plan,
      },
    });
  }),
];

const postSaveDiet = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    if (!req.body) {
      throw new ErrorWithStatusCode("You must provide a diet to save!", 400);
    }
    const dietJSON = JSON.stringify(req.body);
    const finalJson = JSON.stringify({
      plan: dietJSON,
    });
    const userId = req.session.passport.user;
    const dateTime = new Date();
    const entryId = uuidv4();

    await prisma.dietEntries.create({
      data: {
        ownerid: userId,
        diet: finalJson,
        name: `${"diet" + dateTime.toDateString() + entryId}`,
      },
    });

    res.status(201).json({
      data: {
        message: "Diet has been saved succesfully",
        status: 201,
      },
    });
  }),
];

const deleteEntry = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    const dietId = Number(req.params.dietId);
    const userId = req.session.passport.user;
    const entry = await prisma.dietEntries.delete({
      where: {
        ownerid: userId,
        id: dietId,
      },
    });

    if (!entry) {
      throw new ErrorWithStatusCode("Entry to delete does not exist", 400);
    }

    res.status(200).json({
      data: {
        message: `You have deleted the entry ${entry.name}`,
        status: 200,
      },
    });
  }),
];
const downloadEntry = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    if (!req.params.dietId) {
      throw new ErrorWithStatusCode(
        "You must provide a dietId to download!",
        400
      );
    }
    const dietId = Number(req.params.dietId);
    const userId = req.session.passport.user;
    const entry = await prisma.dietEntries.findFirst({
      where: {
        id: dietId,
        ownerid: userId,
      },
    });

    if (!entry) {
      throw new ErrorWithStatusCode("This entry does not exist!", 400);
    }

    res.set({
      "content-type": "text/plain",
      "content-disposition": `attachment; filename=${
        entry.name + entry.createdat
      }`,
    });
    res.send(entry.diet);
  }),
];

// TODO finisht the function for getting all of the diet entries

const getAllDietEntries = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    const entries = await prisma.dietEntries.findMany({
      where: {
        ownerid: userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).json({
      data: {
        entries: entries,
        message: "Here are your diet entries",
        status: 200,
      },
    });
  }),
];

module.exports = {
  postAiDietician,
  deleteEntry,
  downloadEntry,
  getAllDietEntries,
  postSaveDiet,
};
