const express = require("express");

const generoController = require("../controllers/genero.controller");

const router = express.Router();

router.get("/", generoController.getGenero);

module.exports = router;
