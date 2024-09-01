const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Pei extends Model {}

Pei.init(
  {
    idpei: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombrecolegio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombrepei: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcionpei: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vision: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fkprocedupei: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: "ProcesoEducativo",
        key: "idprocesoeducativo",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Pei",
    tableName: "pei",
  }
);

module.exports = Pei;
