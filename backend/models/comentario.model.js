const { DataTypes, Model, Sequelize } = require("sequelize");
const db = require("../utils/database");

class Comentario extends Model {}

Comentario.init(
  {
    idcomentario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechacomentario: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    contenidocomentario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fkcomunicadocoment: {
      type: DataTypes.INTEGER,
      references: {
        model: "Comunicado",
        key: "idcomunicado",
      },
    },
    fkusuariocoment: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuario",
        key: "idusuario",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Comentario",
    tableName: "comentario",
  }
);

module.exports = Comentario;
