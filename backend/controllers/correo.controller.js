const correoService = require("../services/correo.service");

const getCorreos = async (req, res) => {
  try {
    const correo = await correoService.getCorreos();
    res.json(correo);
  } catch (error) {
    console.log("Error al Obtener los correos", error);
    res.status(500).json("Error getting emails");
  }
};

module.exports = { getCorreos };
