const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Usuario extends Model {}

Usuario.init(
  {
    idusuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechanacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fkgenerousuario: {
      type: DataTypes.INTEGER,
      references: {
        model: "Genero",
        key: "idgenero",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Usuario",
    tableName: "usuario",
  }
);

module.exports = Usuario;
