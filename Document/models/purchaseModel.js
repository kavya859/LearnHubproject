// Mongoose Purchase model
import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  method: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
