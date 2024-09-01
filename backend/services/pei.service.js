const Pei = require("../models/pei.model");
const ArchivoPei = require("../models/archivopei.model");

class PeiService {
  async createPeiConArchivo(data, archivo) {
    try {
      const pei = await Pei.create(data);

      const archivoPei = await ArchivoPei.create({
        nombrearchivopei: archivo.originalname,
        tipoarchivopei: archivo.mimetype,
        contenidoarchivopei: archivo.buffer,
        fechaarchivopei: new Date(),
        fkpeiarchivopei: pei.idpei,
      });

      return { pei, archivoPei };
    } catch (error) {
      console.error("Service, Error creating PEI with archivo", error);
      throw error;
    }
  }

  async getAllArchivosPei() {
    try {
      const archivosPei = await ArchivoPei.findAll();
      return archivosPei;
    } catch (error) {
      console.error("Service, Error fetching all ArchivosPei", error);
      throw error;
    }
  }
}

module.exports = new PeiService();
