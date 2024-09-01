const Genero = require("../models/genero.model");

class GeneroService {
  async getGenero() {
    return Genero.findAll();
  }

  async getGeneroByPk() {
    return Genero.findByPk();
  }
}

module.exports = new GeneroService();
