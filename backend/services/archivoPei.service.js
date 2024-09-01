const ArchivoPei = require("../models/archivopei.model");

class ArchivoPeiService {
  async getArchivoPeiById(id) {
    try {
      const archivoPei = await ArchivoPei.findByPk(id, {
        attributes: ["idarchivopei", "tipoarchivopei", "contenidoarchivopei"],
      });
      if (!archivoPei) {
        throw new Error("SERVICE, Archivo PEI no encontrado");
      }
      return archivoPei;
    } catch (error) {
      console.error("Service, Error fetching ArchivoPei", error);
      throw error;
    }
  }
}

module.exports = new ArchivoPeiService();
