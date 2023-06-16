const express = require("express");
const {
  create_student,
  allStudents,
  uploadFiles,
  getStudent,
} = require("../controllers/students");
const { protect, authorize } = require("../middleware/auth");
const students = require("../models/students");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("tutor", "student"), create_student)
  .get(protect, authorize("tutor"), allStudents);
router.route("/profile/:studentId").put(protect, uploadFiles);
router.route("/:id").get(protect, authorize("tutor", "student"), getStudent);

module.exports = router;
