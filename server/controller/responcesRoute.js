import express from "express";
import { randomUUID } from "crypto";
import {
  getResponces,
  insertResponce,
} from "../model/responce_Table_Functions.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const responceId = randomUUID();
    const { surveyId, answers, email } = req.body;
    await insertResponce(responceId, surveyId, answers, email);
    res.json({ res: "success", status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred inserting responce",
      status: "nok",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const result = await getResponces(id);
    res.json({ res: result, status: "ok" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      res: "An unexpected error occurred getting responce",
      status: "nok",
    });
  }
});
export default router;
