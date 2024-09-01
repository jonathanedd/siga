//MODELS
const Comentario = require("../models/comentario.model");

const { Usuario, Comunicado } = require("../utils/associations");

// Date
const { format } = require("date-fns");
const { es } = require("date-fns/locale");

//SERVICE
class ComentarioService {
  //get comentarios
  async getComentario() {
    return Comentario.findAll();
  }

  //Servicio obtener comentario por comunicado
  async getComentariosByComunicado(idcomunicado) {
    try {
      const comunicado = await Comunicado.findByPk(idcomunicado, {
        attributes: [
          "idcomunicado",
          "fechacomunicado",
          "titulocomunicado",
          "contenidocomunicado",
        ],
        include: [
          {
            model: Comentario,
            as: "comentario",
            attributes: [
              "idcomentario",
              "fechacomentario",
              "contenidocomentario",
            ],
            include: [
              {
                model: Usuario,
                as: "usuario",
                attributes: ["nombres", "apellidos"],
              },
            ],
            order: [["fechacomentario", "ASC"]], // Ordenar por fecha, los más antiguos primero
          },
        ],
      });

      if (!comunicado) {
        throw new Error("Comunicado no encontrado");
      }

      //crear fecha actual y local
      const comentariosFormateados = comunicado.comentario.map((comentario) => {
        const fechaUTC = new Date(comentario.fechacomentario);

        const fechaLocal = new Date(
          fechaUTC.getTime() - fechaUTC.getTimezoneOffset() * 60000
        );

        const formattedDate = format(
          fechaLocal,
          "MMM d 'de' yyyy, 'a las' hh:mm a",
          { locale: es }
        );

        return {
          ...comentario.toJSON(),
          fechacomentario: formattedDate,
        };
      });

      return comentariosFormateados;
    } catch (error) {
      console.error("Error al obtener comentarios por comunicado", error);
      throw error;
    }
  }

  // servicio crear comentario
  async createComentario(data) {
    try {
      const now = new Date();
      const comentario = await Comentario.create({
        ...data,
        fechacomentario: now,
      });
      const formattedDate = format(now, "MM dd 'de' yyyy, hh:mm a", {
        locale: es,
      });

      return {
        ...comentario.toJSON(),
        fechacomentario: formattedDate,
      };
    } catch (error) {
      console.error("Error creating comentario", error);
      throw error;
    }
  }
}

module.exports = new ComentarioService();
