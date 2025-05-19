const { Router } = require("express");
const weightRouter = Router();
const {
  getWeightDataForSpecifiedTimeFrame,
  getWeightDataForPastThirtyDays,
} = require("../controllers/weightdata");
const {
  postWeightEntry,
  deleteWeightEntry,
} = require("../controllers/weightentry");

weightRouter.post("/entry", postWeightEntry);
weightRouter.get(
  "/retrieve/:startmonth-:startday-:startyear-:endmonth-:endday-:endyear",
  getWeightDataForSpecifiedTimeFrame
);
weightRouter.get("/retrieve", getWeightDataForPastThirtyDays);
weightRouter.delete("/entry/:month-:day-:year", deleteWeightEntry);
module.exports = weightRouter;



