const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Telefono extends Model {}

Telefono.init(
  {
    idtelefono: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fktelefonousuario: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuario",
        key: "idusuario",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Telefono",
    tableName: "telefono",
  }
);

module.exports = Telefono;
