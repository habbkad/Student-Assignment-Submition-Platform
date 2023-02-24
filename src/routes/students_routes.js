const express = require("express");
const { create_student, allStudents } = require("../controllers/students");

const router = express.Router();

router.route("/").post(create_student).get(allStudents);

module.exports = router;
