// backend/models/courseModel.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number
});

// ✅ This line must be present to export properly
const Course = mongoose.model("Course", courseSchema);
export default Course;

