const express = require("express");
const { signUpUser } = require("../controllers/user");

const router = express.Router();

router.route("/").post(signUpUser);

module.exports = router;
