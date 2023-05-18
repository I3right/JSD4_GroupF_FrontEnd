const express = require("express");
const router = express.Router();
const {login} = require('../controllers/autentication')

router.post("/login", login);

router.get("/test", (req, res) => res.send("works jing jing"));

module.exports = router;
