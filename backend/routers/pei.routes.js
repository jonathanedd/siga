const express = require("express");
const upload = require("../utils/multer");
const peiController = require("../controllers/pei.controller"); // Asegúrate de que esta importación sea correcta
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authenticate.middleware");

const router = express.Router();

// Definición de rutas
router.get(
  "/:id",
  verificarToken,
  peiController.getPeiById
  // peiController.getArchivoPeiById
);

router.post(
  "/upload",
  verificarToken,
  verificarRol(["ADMIN", "DIRECTOR"]),
  upload.single("file"),
  peiController.createPeiConArchivo
);

module.exports = router;
