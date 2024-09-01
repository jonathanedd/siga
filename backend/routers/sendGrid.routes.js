const express = require("express");

const sendGridController = require("../controllers/sendGrid.controller");

const router = express.Router();

router.post("/send", sendGridController.sendEmail);

module.exports = router;
