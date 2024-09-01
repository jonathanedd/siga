const express = require("express");
const router = express.Router();
const {
  getProcesoEducativoId,
} = require("../controllers/procesoEducativo.controller");

router.get("/id", getProcesoEducativoId);

module.exports = router;
