const express = require("express");
const router = express.Router();
const {
  createActivity,
  getAllActivity,
  getActivity,
  deleteActivity,
  updateActivity,
  getSumHikingDistances,
  getSumRunningDistances
} = require("../controllers/activityController.js");
const { uploadImage } = require("../utils/cloudinary.js")


// router.get('/query', queryActivity)
router.post("/create", createActivity);
router.get("/user/:userId", getAllActivity);
router.get("/get/:activityId", getActivity);
router.delete("/delete/:activityId", deleteActivity);
router.put("/update/:activityId", updateActivity);
router.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});
router.get("/getSumHikingDistances/:userId", getSumHikingDistances);
router.get("/getSumRunningDistances/:userId", getSumRunningDistances);



router.get("/test", (req, res) => { res.json({ message: "works jing jing" }) });

module.exports = router;
