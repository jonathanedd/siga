const express = require("express");
const statisticsController = require("../controllers/statistic.controller");
// const { verificarToken } = require("../middlewares/authenticate.middleware");

const router = express.Router();

router.get("/", statisticsController.getStatistics);

module.exports = router;
