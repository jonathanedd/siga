const comunicadoService = require("../services/comunicado.service");
const usuarioService = require("../services/usuario.service");

const getComunicado = async (req, res) => {
  try {
    const comunicado = await comunicadoService.getComunicado();
    res.json(comunicado);
  } catch (error) {
    console.log("Error al obtener los correos", error);
    res.status(500).json("Error getting post");
  }
};

const crearComunicado = async (req, res) => {
  try {
    const idusuario = req.usuario.idusuario;
    console.log("ID DEL USUARIO", idusuario);

    const usuario = await usuarioService.getUsuarioByPk(idusuario);

    if (!usuario) {
      console.log("Usuario no encontrado para ID:", idusuario);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const comunicado = await comunicadoService.createComunicado({
      titulocomunicado: req.body.titulocomunicado,
      contenidocomunicado: req.body.contenidocomunicado,
      fkusuariocomunicado: idusuario,
    });

    const response = {
      message: "Comunicado creado exitosamente",
      comunicado: {
        ...comunicado.toJSON(),
        usuario: {
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          //rol: usuario.usuarioRoles[0].rol.descripcionrol, // Asumiendo que un usuario solo tiene un rol
        },
      },
    };
    console.log("Response:", response);
    res.status(201).json(response);
  } catch (error) {
    console.log("Error al crear el comunicado", error);
    res.status(500).json("Error creating comunicado");
  }
};

module.exports = { getComunicado, crearComunicado };
