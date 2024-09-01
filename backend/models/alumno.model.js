const { DataTypes, Model } = require("sequelize");
const db = require("../utils/database");

class Alumno extends Model {}

Alumno.init({
  idalumno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estadoalumno: {},
});
