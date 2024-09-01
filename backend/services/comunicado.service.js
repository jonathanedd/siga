const { format } = require("date-fns");
const { es } = require("date-fns/locale");
const { Comunicado, Usuario } = require("../utils/associations");
const Comentario = require("../models/comentario.model");

class ComunicadoService {
  // obtener los comunicados
  async getComunicado() {
    try {
      const comunicados = await Comunicado.findAll({
        include: [
          {
            model: Usuario,
            as: "usuario",
            attributes: ["nombres", "apellidos"], // Asegúrate de incluir 'rol' si está disponible en el modelo
          },
        ],
        order: [["fechacomunicado", "DESC"]],
      });
      // return comunicados;
      return comunicados.map((comunicado) => {
        
        const formattedDate = format(
          new Date(comunicado.fechacomunicado),

          "MMM dd 'de' yyyy, 'a las' hh:mm a",
          { locale: es }
        );
        return {
          ...comunicado.toJSON(),
          fechacomunicado: formattedDate,
        };
      });
    } catch (error) {
      console.error("Error fetching comunicados:", error);
      throw error;
    }
  }

  async getComunicadoByPk(idcomunicado) {
    return Comunicado.findByPk(idcomunicado, {
      attributes: [
        "idcomunicado",
        "fechacomunicado",
        "titulocomunicado",
        "contenidocomunicado",
      ],
      include: [
        {
          model: Usuario,
          as: "usuario",
          attributes: ["nombres", "apellidos"],
          include: [
            {
              model: Comentario,
              as: "comentario",
              attributes: [
                "idcomentario",
                "fechacomentario",
                "contenidocomentario",
                "fkusuariocoment",
                "fkcomunicadocoment",
              ],
              include: [
                {
                  model: Usuario,
                  as: "usuario",
                  attributes: ["nombres", "apellidos"],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async createComunicado(data) {
    try {
      const now = new Date();

      const comunicado = await Comunicado.create({
        ...data,
        fechacomunicado: now,
      });

      // const comunicado = await Comunicado.create(data);
      const formattedDate = format(now, "MMM dd 'de' yyyy, hh:mm a", {
        locale: es,
      });
      // return comunicado;
      return {
        ...comunicado.toJSON(),
        fechacomunicado: formattedDate,
      };
    } catch (error) {
      console.error("Error creating comunicado:", error);
      throw error;
    }
  }
}

module.exports = new ComunicadoService();
