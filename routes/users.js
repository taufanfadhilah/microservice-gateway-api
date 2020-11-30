const express = require("express");
const router = express.Router();
const userHandler = require("./handler/users");
const verifyToken = require("../middleware/verifyToken");

router.post("/login", userHandler.login);
router.get("/detail", verifyToken, userHandler.detail);

module.exports = router;
