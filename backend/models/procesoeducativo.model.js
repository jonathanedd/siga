const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class ProcesoEducativo extends Model {}

ProcesoEducativo.init(
  {
    idprocesoeducativo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreproceso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcionproceso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fkinstiprocedu: {
      type: DataTypes.INTEGER,
      references: {
        model: "Institucion",
        key: "idinstitucion",
      },
    },
    fecharegistroproceso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaterminacionproceso: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "ProcesoEducativo",
    tableName: "procesoeducativo",
  }
);

module.exports = ProcesoEducativo;
