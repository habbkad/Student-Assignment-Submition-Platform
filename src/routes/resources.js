const express = require("express");
const {
  create_resource,
  update_resource,
  get_all_resource,
  delete_resource,
} = require("../controllers/resources");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, authorize("tutor"), create_resource);
router.route("/").get(protect, authorize("tutor", "student"), get_all_resource);
router.route("/:id").put(protect, authorize("tutor"), update_resource);
router.route("/:id").delete(protect, authorize("tutor"), delete_resource);

module.exports = router;
