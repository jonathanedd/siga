const Rol = require("../models/rol.model");

const getRol = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    console.log("Error al cargar los roles", error);
    res.status(500).json("Error al cargar los roles");
  }
};

const getRolById = async (req, res) => {
  try {
    const rolId = req.params.id;
    const rol = await Rol.findByPk(rolId);

    console.log(rol.idrol);

    if (!rol) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(rol);
  } catch (error) {
    console.log("Error al obtener el rol por su id ", error);
    res.status(500).json({ error: "Error getting rol by id" });
  }
};

module.exports = { getRol, getRolById };

