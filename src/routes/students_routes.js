const express = require("express");
const {
  create_student,
  allStudents,
  uploadFiles,
} = require("../controllers/students");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(protect, create_student)
  .get(protect, authorize("tutor"), allStudents);
router.route("/:studentId").put(protect, uploadFiles);

module.exports = router;
