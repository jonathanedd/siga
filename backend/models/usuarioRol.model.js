const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class UsuarioRol extends Model {}

UsuarioRol.init(
  {
    idusuariorol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fkrolusuariorol: {
      type: DataTypes.INTEGER,
      references: {
        model: "Rol",
        key: "idrol",
      },
    },
    fkusuusuariorol: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuario",
        key: "idusuario",
      },
    },
    fechaasignacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "UsuarioRol",
    tableName: "usuariorol",
  }
);

module.exports = UsuarioRol;
