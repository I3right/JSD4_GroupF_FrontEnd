const express = require("express");
const router = express.Router();
const {
  createActivity,
  getAllActivity,
  getActivity,
  deleteActivity,
  updateActivity,
} = require("../controllers/activityController.js");

router.post("/create", createActivity);
router.get("/all", getAllActivity);
router.get("/:activityId", getActivity);
router.delete("/delete/:activityId", deleteActivity);
router.put("/update/:activityId", updateActivity);


module.exports = router;
