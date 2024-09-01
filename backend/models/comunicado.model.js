const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");
const moment = require("moment-timezone");

class Comunicado extends Model {}
Comunicado.init(
  {
    idcomunicado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    fechacomunicado: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () =>
        moment().tz("America/Bogota").format("YYYY-MM-DD HH:mm:ss"),
    },
    titulocomunicado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenidocomunicado: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fkusuariocomunicado: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuario",
        key: "idusuario",
      },
    },
  },

  { sequelize: db, modelName: "Comunicado", tableName: "comunicado" }
);



module.exports = Comunicado;
