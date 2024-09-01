const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");
const Usuario = require("./usuario.model");
const UsuarioRol = require("./usuarioRol.model");

class Rol extends Model {}

Rol.init(
  {
    idrol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcionrol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fkprocedu: {
      type: DataTypes.INTEGER,
      references: {
        model: "ProcesoEducativo",
        key: "idprocesoeducativo",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Rol",
    tableName: "rol",
  }
);

// Rol.belongsToMany(Usuario, {
//   through: UsuarioRol,
//   foreignKey: "fkrolusuariorol",
//   otherKey: "fkusuusuariorol",
//   as: "usuarios",
// });

module.exports = Rol;
