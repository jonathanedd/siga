const express = require("express");

const comentarioController = require("../controllers/comentario.controller");

const router = express.Router();

router.get("/", comentarioController.getComentario);
router.post(
  "/comunicados/:idcomunicado/comentario",
  comentarioController.crearComentario
);
router.get(
  "/comunicados/:idcomunicado/comentarios",
  comentarioController.getComentariosByComunicado
);

module.exports = router;
