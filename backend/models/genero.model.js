const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Genero extends Model {}

Genero.init(
  {
    idgenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombregenero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Genero",
    tableName: "genero",
  }
);

module.exports = Genero;
