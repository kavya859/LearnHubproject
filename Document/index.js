import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/courses", courseRoutes);
app.use("/api/purchases", purchaseRoutes);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/learnhub")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(8000, () => console.log("🚀 Server running at http://localhost:8000"));
  })
  .catch(err => console.error(err));
