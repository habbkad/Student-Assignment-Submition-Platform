const express = require("express");
const { create_student } = require("../controllers/students");

const router = express.Router();

router.route("/student").post(create_student);

module.exports = router;
