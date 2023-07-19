import http from "http";
import express from "express";
import cors from "cors";
import { onStartup } from "./databaseFunctions/users_Table_Functions.js";
import {
  getAccountSurveys,
  createSurvey,
} from "./databaseFunctions/surveys_Table_Functions.js";
import { getSurveyQuestions } from "./databaseFunctions/question_Table_Functions.js";
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
      res: "An unexpected error occurred creating surveys",
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

httpserver.listen(3000, () => console.log("server started on port 3000"));
