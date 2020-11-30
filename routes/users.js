const express = require("express");
const router = express.Router();
const userHandler = require("./handler/users");

router.post("/login", userHandler.login);

module.exports = router;
