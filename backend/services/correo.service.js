const Correo = require("../models/correo.model");

class CorreoService {
  async getCorreos() {
    return Correo.findAll();
  }
}

module.exports = new CorreoService();
