//service
const userService = require("../services/usuario.service");

const getStatistics = async (req, res) => {
  try {
    const usersByRole = await userService.getUsersByRole(); // cambiar
    res.json({ usersByRole });
  } catch (error) {
    console.error("Error al obtener estadísticas de la base de datos", error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

module.exports = {
  getStatistics,
};
