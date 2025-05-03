const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaclient");
const ensureAuthenticated = require("../middleware/authenticated");
const ErrorWithStatusCode = require("../errors/statuscode");

const getWeightDataForMonth = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    const searchedDate = new Date();
    const firstDay = new Date(
      searchedDate.getFullYear(),
      searchedDate.getMonth(),
      1
    );
    const lastDay = new Date(
      searchedDate.getFullYear(),
      searchedDate.getMonth() + 1,
      0
    );
    const userId = req.session.passport.user;
    const dateData = await prisma.weightEntries.findMany({
      where: {
        ownerid: userId,
        createdat: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    });

    res.status(302).json({
      data: {
        dates: dateData,
        status: 302,
      },
    });
  }),
];

const getWeightDataForSpecifiedTimeFrame = [
  ensureAuthenticated,
  asyncHandler(async (req, res, next) => {
    const startDate = new Date(
      +req.params.startyear,
      +req.params.startmonth - 1,
      +req.params.startday
    );
    const endDate = new Date(
      +req.params.endyear,
      +req.params.endmonth - 1,
      +req.params.endday
    );

    if (startDate > endDate) {
      throw new ErrorWithStatusCode(
        "The start date can't be later than the end date!",
        400
      );
    }

    const userId = req.session.passport.user;

    const weightData = await prisma.weightEntries.findMany({
      where: {
        ownerid: userId,
        createdat: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (weightData.length === 0) {
      res.status(404).json({
        error: {
          message: "There were no entries found",
          statu: 404,
        },
      });
    } else {
      res.status(302).json({
        data: {
          dates: weightData,
          status: 302,
        },
      });
    }
  }),
];

module.exports = { getWeightDataForMonth, getWeightDataForSpecifiedTimeFrame };
