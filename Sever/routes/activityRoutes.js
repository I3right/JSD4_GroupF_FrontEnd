const express = require("express");
const router = express.Router();
const {
  createActivity,
  getAllActivity,
  getActivity,
  deleteActivity,
  updateActivity,
} = require("../controllers/activityController.js");
const {uploadImage} = require("../utils/cloudinary.js")


router.post("/create", createActivity);
router.get("/all", getAllActivity);
router.get("/single/:activityId", getActivity);
router.delete("/delete/:activityId", deleteActivity);
router.put("/update/:activityId", updateActivity);
router.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

router.get("/test", (req, res) => {res.json({ message: "works jing jing" })});

module.exports = router;
