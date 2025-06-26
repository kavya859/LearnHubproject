const mongoose = require("mongoose");

const coursePaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Use correct model name (capitalize if model is "User")
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Same here if model name is "Course"
      required: true,
    },
    cardDetails: {
      cardholderName: {
        type: String,
        required: true,
      },
      cardNumber: {
        type: String, // Changed from Number → safer to store as string
        required: true,
      },
      cvvCode: {
        type: String, // Changed from Number for safety
        required: true,
      },
      expMonthYear: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["enrolled", "cancelled", "pending"],
      default: "enrolled",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CoursePayment", coursePaymentSchema);
