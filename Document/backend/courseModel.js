const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    educator: {
      type: String,
      required: [true, "Educator name is required"],
    },
    title: {
      type: String,
      required: [true, "Course title is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    price: {
      type: String,
      default: "Free",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    sections: {
      type: Object,
      default: {},
    },
    enrolled: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
