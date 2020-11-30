const express = require("express");
const router = express.Router();
const houseHandler = require("./handler/house");

router.get("/", houseHandler.getAll);

module.exports = router;
