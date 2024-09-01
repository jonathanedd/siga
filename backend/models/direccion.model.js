const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Direccion extends Model {}

Direccion.init(
  {
    iddireccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fkdireccionusuario: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuario",
        key: "idusuario",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Direccion",
    tableName: "direccion",
  }
);

module.exports = Direccion;
