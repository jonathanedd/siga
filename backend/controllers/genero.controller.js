const generoService = require("../services/genero.service");

const getGenero = async (req, res) => {
  try {
    const genero = await generoService.getGenero();
    res.json(genero);
  } catch (error) {
    console.log("Error al obtener genero", error);
    res.status(500).json("Error obtaining data");
  }
};

module.exports = { getGenero };
