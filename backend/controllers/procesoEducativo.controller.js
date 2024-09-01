const ProcesoEducativoService = require("../services/procesoEducativo.service");

const getProcesoEducativoId = async (req, res) => {
  try {
    const id = await ProcesoEducativoService.getProcesoEducativoId();
    res.status(200).json({ idprocesoeducativo: id });
    console.log("CONTROLLER, Este es el id del proceso", id);
  } catch (error) {
    console.error(
      "Controller, Error al obtener el ID del proceso educativo",
      error
    );
    res
      .status(500)
      .json({ message: "Error al obtener el ID del proceso educativo" });
  }
};

module.exports = {
  getProcesoEducativoId,
};
