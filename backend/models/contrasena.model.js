const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Contrasena extends Model {}

Contrasena.init(
  {
    idcontrasena: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fkusuariocontrasena: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuario",
        key: "idusuario",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Contrasena",
    tableName: "contrasena",
  }
);

module.exports = Contrasena;
