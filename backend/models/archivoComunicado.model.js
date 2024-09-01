const { DataTypes, Model, Sequelize } = require("sequelize");
const db = require("../utils/database");

class ArchivoComunicado extends Model {}

ArchivoComunicado.init(
  {
    idarchivocomunicado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombrearchivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoarchivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenidoarchivo: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
    fechaarchivo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fkcomunicadoarch: {
      type: DataTypes.INTEGER,
      references: {
        model: "Comunicado",
        key: "idcomunicado",
      },
    },
  },
  {
    sequelize: db,
    modelName: "ArchivoComunicado",
    tableName: "archivocomunicado",
  }
);

module.exports = ArchivoComunicado;
