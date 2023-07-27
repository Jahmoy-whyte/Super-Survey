import express from "express";
import {
  getQuestions,
  deleteQuestions,
  insertQuestions,
  updateQuestions,
} from "../model/question_Table_Functions.js";

const router = express.Router();
router.get("/:id", async (req, res) => {
  try {
    const surveyId = req.params.id;
    const result = await getQuestions(surveyId);
    res.json({ res: result, status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred get survey questions",
      status: "nok",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const surveyQuestions = req.body;
    const result = await insertQuestions(surveyQuestions);
    res.json({ res: result, status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred inserting survey questions",
      status: "nok",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const surveyQuestions = req.body;
    await updateQuestions(id, surveyQuestions);
    res.json({ res: "success", status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred updating survey questions",
      status: "nok",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteQuestions(id);
    res.json({ res: "success", status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred deleting survey questions",
      status: "nok",
    });
  }
});
export default router;
