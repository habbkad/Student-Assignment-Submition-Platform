const express = require("express");
const {
  submit_assignment,
  delete_assignment,
  all_assignment,
  update_assignment,
  get_single_assignment,
  uploadFiles,
} = require("../controllers/assignment");

const router = express.Router({ mergeParams: true });
router.route("/").get(all_assignment);

router.route("/:studentId").post(submit_assignment);

router.route("/:studentId/:assignmentId").put(uploadFiles);

router
  .route("/:id")
  .delete(delete_assignment)
  .put(update_assignment)
  .get(get_single_assignment);

module.exports = router;
