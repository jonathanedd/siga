const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Institucion extends Model {}

Institucion.init(
  {
    idinstitucion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreinstitucion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaingresoinstitucion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechasalidainstitucion: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Institucion",
    tableName: "institucion",
  }
);

module.exports = Institucion;
