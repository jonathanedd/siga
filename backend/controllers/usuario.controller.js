// services
const userService = require("../services/usuario.service");
const generoService = require("../services/genero.service");
const usuarioService = require("../services/usuario.service");

const getUsuarios = async (req, res) => {
  try {
    const usuario = await userService.getUsers();
    res.json(usuario);
  } catch (error) {
    console.log("Error al obtener ususarios de la base de datos", error);
    res.status(500).json("Error connecting to database");
  }
};

const createUsuario = async (req, res) => {
  const genero = await generoService.getGenero(req.body.fkgenerousuario);

  const usuarioNuevo = await usuarioService.createUser({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    fechanacimiento: req.body.fechanacimiento,
    fkgenerousuario: req.body.fkgenerousuario,
  });

  if (genero) {
    await usuarioNuevo.save();
  } else {
    return res.status(404).json({ error: "Genero not found" });
  }
  res.status(201).json(usuarioNuevo);

  try {
  } catch (error) {
    console.log("Error al crear el usuario", error);
    res.status(500).json("Error creating user");
  }
};

module.exports = { getUsuarios, createUsuario };
