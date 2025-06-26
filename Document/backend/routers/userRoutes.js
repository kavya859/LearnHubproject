const express = require("express");
const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  postCourseController,
  getAllCoursesUserController,
  deleteCourseController,
  getAllCoursesController,
  enrolledCourseController,
  sendCourseContentController,
  completeSectionController,
  sendAllCoursesUserController,
} = require("../controllers/userControllers");

const router = express.Router();

// Multer storage config for uploading course content
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExt = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(new Error("Only .mp4 videos are allowed"));
    }
    cb(null, true);
  },
});

// Public routes
router.post("/register", registerController);
router.post("/login", loginController);

// Course creation (authenticated)
router.post(
  "/courses",
  authMiddleware,
  upload.array("S_content"),
  postCourseController
);

// Get all courses for everyone
router.get("/courses", getAllCoursesController);

// Get courses created by the logged-in teacher
router.get("/courses/teacher", authMiddleware, getAllCoursesUserController);

// Delete a course
router.delete("/courses/:courseid", authMiddleware, deleteCourseController);

// Enroll a user in a course
router.post("/courses/enroll/:courseid", authMiddleware, enrolledCourseController);

// Get course content for a student
router.get("/courses/content/:courseid", authMiddleware, sendCourseContentController);

// Mark section complete
router.post("/courses/complete", authMiddleware, completeSectionController);

// Get all courses enrolled by a user
router.get("/courses/user", authMiddleware, sendAllCoursesUserController);

module.exports = router;
