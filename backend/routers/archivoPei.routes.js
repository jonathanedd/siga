const express = require("express");
const router = express.Router();
const archivoPeiController = require("../controllers/archivoPei.controller");

router.get("/:id", archivoPeiController.getArchivoPeiById);

module.exports = router;
