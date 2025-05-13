const { Router } = require("express");
const dieticianRouter = Router();
const {
  postAiDietician,
  getAllDietEntries,
  deleteEntry,
  downloadEntry,
  postSaveDiet
} = require("../controllers/dietician");

dieticianRouter.post("/", postAiDietician);
dieticianRouter.get("/generateddiet", getAllDietEntries);
dieticianRouter.post("/savediet", postSaveDiet);
dieticianRouter.get("/generateddiet/:dietId", downloadEntry);

dieticianRouter.delete("/generateddiet/:dietId", deleteEntry);

module.exports = dieticianRouter;
