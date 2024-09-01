const express = require("express");

const rolController = require("../controllers/rol.controller");

const router = express.Router();

router.get("/", rolController.getRol);
router.get("/:id", rolController.getRolById);

module.exports = router;
