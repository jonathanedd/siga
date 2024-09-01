const Pei = require("../models/pei.model");
const ArchivoPei = require("../models/archivopei.model"); // Asegúrate de que esto esté importado
const ProcesoEducativoService = require("../services/procesoEducativo.service");
const peiService = require("../services/pei.service");
const path = require("path");
const fs = require("fs");

const getPeiById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("COONTROLLER, ID DEL PEI ES: ", id);
    const pei = await Pei.findOne({
      where: { idpei: id },
      include: [
        {
          model: ArchivoPei,
          as: "archivopei",
        },
      ],
    });

    if (!pei) {
      return res.status(404).json({ message: "PEI no encontrado" });
    }

    return res.status(200).json(pei);
  } catch (error) {
    console.error("Controller, Error fetching PEI", error);
    return res.status(500).json({ message: "Error al obtener el PEI" });
  }
};

const createPeiConArchivo = async (req, res) => {
  const { nombrecolegio, nombrepei, descripcionpei, mision, vision } = req.body;
  const archivo = req.file;

  try {
    if (!archivo) {
      return res
        .status(400)
        .json({ message: "No se ha subido ningún archivo" });
    }

    const idProcesoEducativo =
      await ProcesoEducativoService.getProcesoEducativoId();

    const nuevoArchivoPei = await ArchivoPei.create({
      nombrearchivopei: archivo.originalname,
      tipoarchivopei: archivo.mimetype,
      contenidoarchivopei: archivo.filename,
      fechaarchivopei: new Date(),
    });

    const nuevoPei = await Pei.create({
      nombrecolegio,
      nombrepei,
      descripcionpei,
      mision,
      vision,
      fkprocedupei: idProcesoEducativo,
      idarchivopei: nuevoArchivoPei.idarchivopei,
    });

    nuevoArchivoPei.fkpeiarchivopei = nuevoPei.idpei;
    await nuevoArchivoPei.save();

    return res.status(201).json({
      message: "PEI y Archivo creados exitosamente",
      nuevoPei,
    });
  } catch (error) {
    console.error("Controller, Error creating PEI with Archivo", error);
    return res
      .status(500)
      .json({ message: "Error al crear el PEI con su archivo" });
  }
};

module.exports = {
  getPeiById,
  createPeiConArchivo,
};
