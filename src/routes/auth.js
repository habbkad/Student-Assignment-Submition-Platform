const express = require("express");
const { signUpUser, loginUser, signOutUser } = require("../controllers/user");

const router = express.Router();

router.route("/signup").post(signUpUser);
router.route("/login").post(loginUser);
router.route("/signout").post(signOutUser);

module.exports = router;
