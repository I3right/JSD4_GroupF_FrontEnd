const express = require("express");
const router = express.Router();
const {
  createUser,
  getAlluser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.post("/create", createUser);
router.get("/all", getAlluser);
router.get("/oneUser/:userId", getUser);
router.delete("/delete/:userId", deleteUser);
router.put("/update/:userId", updateUser);

router.get("/test", (req, res) => res.send("works jing jing"));

module.exports = router;
