const express = require("express");

//controller
const registroController = require("../controllers/registro.controller");
//middlewares
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authenticate.middleware");

const router = express.Router();

router.post(
  "/",
  verificarToken,
  verificarRol(["ADMIN"]),
  registroController.registrarUsuario
);

module.exports = router;
