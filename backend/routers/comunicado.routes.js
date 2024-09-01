const express = require("express");

const comunicadoController = require("../controllers/comunicado.controller");
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authenticate.middleware");

const router = express.Router();

router.get("/", comunicadoController.getComunicado);
router.post(
  "/",
  verificarToken,
  verificarRol(["ADMIN", "DIRECTOR", "COORDINADOR", "DOCENTE", "ASISTENTE"]),
  comunicadoController.crearComunicado
);

module.exports = router;
