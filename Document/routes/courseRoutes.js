// backend/routes/courseRoutes.js
import express from "express";
import Course from "../models/courseModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

export default router;

