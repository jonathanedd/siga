const { Usuario, UsuarioRol, Rol } = require("../utils/associations");
const db = require("../utils/database");

class UserService {
  //Get usuarios
  async getUsers() {
    return Usuario.findAll();
  }

  //obtener por primary key
  async getUsuarioByPk(idusuario) {
    return Usuario.findByPk(idusuario, {
      attributes: ["idusuario", "nombres", "apellidos"],
      include: [
        {
          model: UsuarioRol,
          as: "usuarioRoles",
          attributes: [],
          include: [
            {
              model: Rol,
              as: "rol",
              attributes: ["descripcionrol"],
            },
          ],
        },
      ],
    });
  }

  //crear usuario
  async createUser() {
    return Usuario.create();
  }

  // roles por usuario para graficos estadisticos
  async getUsersByRole() {
    try {
      const usersByRole = await Usuario.findAll({
        attributes: [
          "idusuario",
          [db.col("usuarioRoles.rol.descripcionrol"), "rol"],
          [db.fn("count", db.col("usuarioRoles.idusuariorol")), "count"],
        ],
        include: [
          {
            model: UsuarioRol,
            as: "usuarioRoles",
            attributes: [],
            include: [
              {
                model: Rol,
                as: "rol",
                attributes: [],
              },
            ],
          },
        ],
        group: [
          "Usuario.idusuario",
          "usuarioRoles.rol.idrol",
          "usuarioRoles.rol.descripcionrol",
        ],
      });

      console.log("GRAFICOS:", usersByRole);

      return usersByRole.map((userRole) => ({
        rol: userRole.getDataValue("rol"),
        count: userRole.getDataValue("count"),
        // rol: userRole.usuarioRoles?.rol.descripcionrol,
        // count: userRole.dataValues.count,
      }));
    } catch (error) {
      console.error("Error fetching users by role:", error);
      throw error;
    }
  }
}

module.exports = new UserService();
