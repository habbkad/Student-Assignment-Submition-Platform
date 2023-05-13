const express = require("express");
const {
  submit_assignment,
  delete_assignment,
  all_assignment,
  update_assignment,
  get_single_assignment,
  uploadFiles,
} = require("../controllers/assignment");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });
router.route("/").get(protect, authorize("tutor"), all_assignment);

router
  .route("/:studentId")
  .post(protect, authorize("student"), submit_assignment);

router
  .route("/:studentId/:assignmentId")
  .put(protect, authorize("student"), uploadFiles);

router
  .route("/:id")
  .delete(protect, authorize("student", "tutor"), delete_assignment)
  .put(protect, authorize("student"), update_assignment)
  .get(protect, authorize("student", "tutor"), get_single_assignment);

module.exports = router;
