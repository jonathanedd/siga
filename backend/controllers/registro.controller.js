const bcrypt = require("bcrypt");
const Rol = require("../models/rol.model");
const Usuario = require("../models/usuario.model");
const Telefono = require("../models/telefono.model");
const Direccion = require("../models/direccion.model");
const Genero = require("../models/genero.model");
const Correo = require("../models/correo.model");
const Contrasena = require("../models/contrasena.model");
const UsuarioRol = require("../models/usuarioRol.model");

const registrarUsuario = async (req, res) => {
  try {
    const genero = await Genero.findByPk(req.body.fkgenerousuario);

    const rolId = req.body.rolselected; // Obtener ID del rol seleccionado
    const rol = await Rol.findByPk(rolId);

    //bcrypt
    const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);

    // Datos del usuario
    const usuarioNuevo = await Usuario.create({
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      fechanacimiento: req.body.fechanacimiento,
      fkgenerousuario: req.body.fkgenerousuario,
    });

    //Telefono
    const nuevoTelefono = await Telefono.create({
      telefono: req.body.telefono,
      fktelefonousuario: usuarioNuevo.idusuario,
    });

    //Dirección
    const nuevoDireccion = await Direccion.create({
      direccion: req.body.direccion,
      fkdireccionusuario: usuarioNuevo.idusuario,
    });

    //Correo
    const nuevoCorreo = await Correo.create({
      correo: req.body.correo,
      fkusuariocorreo: usuarioNuevo.idusuario,
    });

    //Contraseña
    const nuevoContrasena = await Contrasena.create({
      contrasena: hashedPassword,
      fkusuariocontrasena: usuarioNuevo.idusuario,
    });

    //usuario y rol
    const nuevoUsuarioRol = await UsuarioRol.create({
      fkrolusuariorol: rolId,
      fkusuusuariorol: usuarioNuevo.idusuario,
    });

    if (rol) {
      await nuevoUsuarioRol.save();
    } else {
      return res.status(404).json({ error: "Rol no encontrado" });
    }

    if (genero) {
      await usuarioNuevo.save();
    } else {
      return res.status(404).json({ error: "Genero not found" });
    }
    res.status(201).json({
      message: "Usuario creado exitosamente",
      usuario: usuarioNuevo,
      telefono: nuevoTelefono,
      direccion: nuevoDireccion,
      correo: nuevoCorreo,
      contrasena: nuevoContrasena,
      usuariorol: nuevoUsuarioRol,
    });
  } catch (error) {
    console.log("Error creating a user", error);
    res.status(500).json("Error creating a user ");
  }
};

module.exports = { registrarUsuario };
