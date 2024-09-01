const comentarioService = require("../services/comentario.service");
const comunicadoService = require("../services/comunicado.service");
const usuarioService = require("../services/usuario.service");

const getComentario = async (req, res) => {
  try {
    const comentario = await comentarioService.getComentario();
    res.json(comentario);
  } catch (error) {
    console.log("Error obteniendo los cometarios");
    res.status(500).json("Error fetching comentarios");
  }
};

//==========Obtiene los comentarios por cada comunicado===========
const getComentariosByComunicado = async (req, res) => {
  const { idcomunicado } = req.params;
  try {
    const comentarios = await comentarioService.getComentariosByComunicado(
      idcomunicado
    );
    res.json(comentarios);
  } catch (error) {
    console.error("Error fetching comentarios by comunicado", error);
    res.status(500).json({ message: "Error al obtener comentarios" });
  }
};

// ====================CREAR COMENTARIO =================
const crearComentario = async (req, res) => {
  try {
    const { idcomunicado } = req.params;
    const { idusuario } = req.usuario;
    const { contenidocomentario } = req.body;

    const usuario = await usuarioService.getUsuarioByPk(idusuario);
    if (!usuario) {
      console.log("Usuario no encontrado para ID:", idusuario);
      return res.status(404).json({ message: "Usuario no encotrado" });
    }

    const comunicado = await comunicadoService.getComunicadoByPk(idcomunicado);
    if (!comunicado) {
      console.log("Comentario no existe:", idcomunicado);
      return res.status(404).json({ message: "Usuario no encotrado" });
    }

    const comentario = await comentarioService.createComentario({
      contenidocomentario,
      fkcomunicadocoment: idcomunicado,
      fkusuariocoment: idusuario,
    });
    res
      .status(201)
      .json({ message: "Comentario creado exitosamente", comentario });
  } catch (error) {
    console.error("Error creando el comentario controller", error);
  }
};

module.exports = { getComentario, crearComentario, getComentariosByComunicado };
