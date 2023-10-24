const express = require("express");
const {
  create_tutor,
  getTutor,
  allTutors,
  uploadFiles,
} = require("../controllers/tutors");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .post(protect, authorize("tutor", "student"), create_tutor)
  .get(protect, authorize("tutor"), allTutors);
router.route("/profile/:tutorID").put(protect, uploadFiles);
router.route("/:id").get(protect, authorize("tutor", "student"), getTutor);

module.exports = router;
