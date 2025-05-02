const asyncHandler = require("express-async-handler");
const prisma = require("../config/prismaclient");

const getWeightDataForMonth = [
  asyncHandler(async (req, res, next) => {
    const searchedDate = new Date(req.params.date) || new Date();
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

    const dateData = await prisma.weightEntries.findMany({
      where: {
        ownerid: req.user.id,
        date: {
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
  asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.params;
    const firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const lastDay = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const weightData = await prisma.weightEntries.findMany({
      where: {
        ownerid: req.user.id,
        date: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    });

    res.status(302).json({
      data: {
        dates: weightData,
        status: 302,
      },
    });
  }),
];

module.exports = {getWeightDataForMonth, getWeightDataForSpecifiedTimeFrame};
