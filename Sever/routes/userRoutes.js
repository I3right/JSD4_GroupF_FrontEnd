const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.post("/create", createUser);
router.get("/get/:userId", getUser);
router.put("/update/:userId", updateUser);
// router.delete("/delete/:userId", deleteUser);  // not being use due to at first want to deleted from DB by admin and want to keep all user data

router.get("/test", (req, res) => res.send("works jing jing"));

module.exports = router;
