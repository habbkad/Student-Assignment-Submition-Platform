const express = require("express");
const {
  create_student,
  allStudents,
  uploadFiles,
} = require("../controllers/students");

const router = express.Router();

router.route("/").post(create_student).get(allStudents);
router.route("/:studentId").put(uploadFiles);

module.exports = router;
