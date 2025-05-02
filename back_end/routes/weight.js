const { Router } = require("express");
const weightRouter = Router();
const {
  getWeightData,
  getWeightDataForSpecifiedTimeFrame,
} = require("../controllers/weightdata");
const postWeightEntry = require("../controllers/weightentry");

weightRouter.get("/retrieve/:month?", getWeightData);
weightRouter.get("/retrieve/:from-:to", getWeightDataForSpecifiedTimeFrame);
weightRouter.post("/create", postWeightEntry);

module.exports = weightRouter;
