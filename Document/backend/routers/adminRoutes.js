const User = require("../schemas/userModel");
const Course = require("../schemas/courseModel");

// Get all users
const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found." });
    }
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all courses
const getAllCoursesController = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
      return res.status(404).json({ success: false, message: "No courses found." });
    }
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a course by ID
const deleteCourseController = async (req, res) => {
  const { courseid } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseid);
    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: "Course not found." });
    }
    res.status(200).json({ success: true, message: "Course deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting course:", error);
    res.status(500).json({ success: false, message: "Failed to delete course." });
  }
};

// Delete a user by ID
const deleteUserController = async (req, res) => {
  const { userid } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userid);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ success: false, message: "Failed to delete user." });
  }
};

// ✅ Correct export for destructuring in router
module.exports = {
  getAllUsersController,
  getAllCoursesController,
  deleteCourseController,
  deleteUserController,
};



