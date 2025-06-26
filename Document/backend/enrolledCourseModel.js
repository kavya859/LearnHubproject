const mongoose = require("mongoose");

const enrolledCourseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Match the model name used in courseModel
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Match the model name used in userModel
      required: true,
    },
    courseLength: {
      type: Number,
      required: true,
    },
    progress: [
      {
        sectionId: { type: String },
        completed: { type: Boolean, default: false },
        completedAt: { type: Date },
      },
    ],
    certificateDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EnrolledCourse", enrolledCourseSchema);
