const ProcesoEducativo = require("../models/procesoeducativo.model");

class ProcesoEducativoService {
  async getProcesoEducativoId() {
    try {
      const proceso = await ProcesoEducativo.findOne();

      if (!proceso) {
        console.error("Service, Error al obtener el id del proceso");
        throw new Error("Service, Proceso educativo no encontrado");
      }
      console.log("ID DEL PROCESO ES: ", proceso);
      return proceso.idprocesoeducativo;
    } catch (error) {
      console.error("Service, Error al obtener el id del proceso");
      throw error;
    }
  }
}

module.exports = new ProcesoEducativoService();
