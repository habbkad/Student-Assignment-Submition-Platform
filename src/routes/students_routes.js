const express = require("express");
const {
  create_student,
  allStudents,
  uploadFiles,
  getStudent,
  updateStudent,
} = require("../controllers/students");
const { protect, authorize, active } = require("../middleware/auth");
const students = require("../models/students");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("tutor", "student"), active, create_student)

  .get(protect, active, authorize("tutor"), allStudents);

router.route("/profile/:studentId").put(protect, active, uploadFiles);
router
  .route("/:id")
  .get(protect, authorize("tutor", "student"), active, getStudent)
  .put(protect, authorize("tutor", "student"), active, updateStudent);

module.exports = router;
