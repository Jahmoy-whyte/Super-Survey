import http from "http";
import express from "express";
import cors from "cors";
import { onStartup } from "./databaseFunctions/users_Table_Functions.js";
import {
  getAccountSurveys,
  createSurvey,
  deleteAccountSurvey,
} from "./databaseFunctions/surveys_Table_Functions.js";
import {
  getSurveyQuestions,
  insertSurveyQuestions,
  deleteSurveyQuestions,
  updateSurveyQuestions,
} from "./databaseFunctions/question_Table_Functions.js";
import { randomUUID } from "crypto";
const app = express();
app.use(express.json());
app.use(cors());
const httpserver = http.createServer(app);

app.get("/", (req, res) => {
  res.send("server up");
});

app.post("/users", async (req, res) => {
  try {
    const userInfo = { email: req.body.email, userId: req.body.userId };
    await onStartup(userInfo);
    const result = await getAccountSurveys(userInfo);
    res.json({ res: result, status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred",
      status: "nok",
    });
  }
});

// =========================== survey end points =========================

app.post("/surveys", async (req, res) => {
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

app.delete("/surveys/:id", async (req, res) => {
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

// =========================== Questions end points =========================

app.get("/questions/:id", async (req, res) => {
  try {
    const surveyId = req.params.id;
    const result = await getSurveyQuestions(surveyId);
    res.json({ res: result, status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred get survey questions",
      status: "nok",
    });
  }
});

app.post("/questions", async (req, res) => {
  try {
    console.log(req.body);
    const surveyQuestions = req.body;
    const result = await insertSurveyQuestions(surveyQuestions);
    res.json({ res: result, status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred inserting survey questions",
      status: "nok",
    });
  }
});

app.put("/questions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const surveyQuestions = req.body;
    await updateSurveyQuestions(id, surveyQuestions);
    res.json({ res: "success", status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred updating survey questions",
      status: "nok",
    });
  }
});

app.delete("/questions/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteSurveyQuestions(id);
    res.json({ res: "success", status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred deleting survey questions",
      status: "nok",
    });
  }
});

httpserver.listen(3000, () => console.log("server started on port 3000"));
