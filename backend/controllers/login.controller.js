const bcrypt = require("bcrypt");
const Rol = require("../models/rol.model");
const Usuario = require("../models/usuario.model");
const Correo = require("../models/correo.model");
const Contrasena = require("../models/contrasena.model");
const UsuarioRol = require("../models/usuarioRol.model");
const { generateToken } = require("../middlewares/authenticate.middleware");

const loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const correoUsuario = await Correo.findOne({ where: { correo } });
    console.log("EL CORREO ES: ", correoUsuario);

    if (!correoUsuario) {
      return res.status(401).json({ message: "Invalid credentials, email" });
    }

    //USUARIO
    const usuario = await Usuario.findByPk(correoUsuario.fkusuariocorreo);

    console.log("EL USUARIO ES: ", usuario);

    if (!usuario) {
      return res.status(401).json({ message: "Invalid credentials, user" });
    }

    //USUARIO ROL
    const usuarioRol = await UsuarioRol.findOne({
      where: { fkusuusuariorol: usuario.idusuario },
    });

    console.log("EL ROL ES:", usuarioRol.idusuariorol);

    if (!usuarioRol) {
      return res.status(401).json({ message: "User does not have a role" });
    }

    //NOMBRE DEL ROL
    const rol = await Rol.findByPk(usuarioRol.fkrolusuariorol);
    console.log("NOMBRE ROL ES: ", rol);

    // if (rol.descripcionrol !== "ADMIN") {
    //   return res
    //     .status(403)
    //     .json({ message: "You do not have permission to access this route" });
    // }

    //---------------------
    const contrasenaUsuario = await Contrasena.findOne({
      where: { fkusuariocontrasena: usuario.idusuario },
    });

    if (!contrasenaUsuario) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      contrasena,
      contrasenaUsuario.contrasena
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await generateToken(usuario, rol.descripcionrol);

    console.log(token);

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario,
      token,
      rol,
    });
  } catch (error) {
    console.error("Error al iniciar sesion: ", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { loginUsuario };
