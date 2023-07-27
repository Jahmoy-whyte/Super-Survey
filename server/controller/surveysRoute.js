import express from "express";
import {
  deleteAccountSurvey,
  createSurvey,
  getSurveyForm,
} from "../model/surveys_Table_Functions.js";
import { randomUUID } from "crypto";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const surveyId = randomUUID();
    const surveyInfo = {
      surveyId: surveyId,
      userId: req.body.userId,
      surveyName: req.body.surveyName,
    };

    await createSurvey(surveyInfo);
    res.json({ res: surveyId, status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred creating survey",
      status: "nok",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteAccountSurvey(id);
    res.json({ res: "success", status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred deleting survey",
      status: "nok",
    });
  }
});

router.get("/form/:id", async (req, res) => {
  try {
    const surveyId = req.params.id;
    const result = await getSurveyForm(surveyId);
    res.json({ res: result, status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred getting survey form",
      status: "nok",
    });
  }
});
export default router;
