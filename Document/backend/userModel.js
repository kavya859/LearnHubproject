const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      set: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    type: {
      type: String,
      required: [true, "User type is required"], // example: "student", "educator"
      enum: ["student", "educator", "admin"], // optional strict typing
    },

    // Optional: future use if you want to populate enrolled courses directly
    // enrolledCourses: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Course",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
