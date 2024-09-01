const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class ArchivoPei extends Model {}

ArchivoPei.init(
  {
    idarchivopei: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombrearchivopei: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoarchivopei: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contenidoarchivopei: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    fechaarchivopei: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fkpeiarchivopei: {
      type: DataTypes.INTEGER,
      references: {
        model: "Pei",
        key: "idpei",
      },
    },
  },
  {
    sequelize: db,
    modelName: "ArchivoPei",
    tableName: "archivopei",
  }
);

module.exports = ArchivoPei;
