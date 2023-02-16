const express = require("express");
const {
  submit_assignment,
  delete_assignment,
  all_assignment,
  update_assignment,
  get_single_assignment,
} = require("../controllers/assignment");

const router = express.Router();

router.route("/").post(submit_assignment).get(all_assignment);
router
  .route("/:id")
  .delete(delete_assignment)
  .put(update_assignment)
  .get(get_single_assignment);

module.exports = router;
