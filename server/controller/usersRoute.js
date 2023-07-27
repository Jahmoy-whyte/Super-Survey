import express from "express";
import { onStartup } from "../model/users_Table_Functions.js";
import { getAccountSurveys } from "../model/surveys_Table_Functions.js";
const router = express.Router();
router.post("/", async (req, res) => {
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

export default router;
