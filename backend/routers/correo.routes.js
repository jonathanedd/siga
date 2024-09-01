const express = require("express");

const correoController = require("../controllers/correo.controller");

const router = express.Router();

router.get("/", correoController.getCorreos);

module.exports = router;
