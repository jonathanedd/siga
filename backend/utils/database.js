const { Sequelize } = require("sequelize");

const db = new Sequelize("siga", "postgres", "92171002", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: false,
  },
});

module.exports = db;
