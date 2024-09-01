const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Correo extends Model {}

Correo.init(
  {
    idcorreo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fkusuariocorreo: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuario",
        key: "idusuario",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Correo",
    tableName: "correo",
  }
);

module.exports = Correo;
