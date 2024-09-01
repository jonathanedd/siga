const ArchivoPeiService = require("../services/archivoPei.service");
const path = require("path");

const getArchivoPeiById = async (req, res) => {
  try {
    const { id } = req.params;
    const archivoPei = await ArchivoPeiService.getArchivoPeiById(id);

    if (!archivoPei) {
      return res.status(404).json({ message: "Archivo PEI no encontrado" });
    }

    const buffer = Buffer.from(archivoPei.contenidoarchivopei.data); // Convertir los datos binarios a Buffer
    res.setHeader("Content-Type", archivoPei.tipoarchivopei);
    res.send(buffer);
    console.log("CONTENIDO ARCHIVO:", archivoPei.contenidoarchivopei);
  } catch (error) {
    console.error("Controller, Error fetching ArchivoPei", error);
    return res
      .status(500)
      .json({ message: "CONTROLLER: Error al obtener el archivo PEI" });
  }
};

module.exports = { getArchivoPeiById };
