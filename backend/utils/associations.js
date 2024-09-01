const Usuario = require("../models/usuario.model");
const Rol = require("../models/rol.model");
const UsuarioRol = require("../models/usuarioRol.model");
const Comunicado = require("../models/comunicado.model");
const Comentario = require("../models/comentario.model");
const Institucion = require("../models/institucion.model");
const ProcesoEducativo = require("../models/procesoeducativo.model");
const ArchivoPei = require("../models/archivopei.model");
const Pei = require("../models/pei.model");

//===================RELACIONES DE USUARIOS Y ROLES=================\\
Usuario.belongsToMany(Rol, {
  through: UsuarioRol,
  foreignKey: "fkusuusuariorol",
  otherKey: "fkrolusuariorol",
  as: "roles",
});

Rol.belongsToMany(Usuario, {
  through: UsuarioRol,
  foreignKey: "fkrolusuariorol",
  otherKey: "fkusuusuariorol",
  as: "usuarios",
});

//Reacion de uno a muchos
Usuario.hasMany(UsuarioRol, {
  foreignKey: "fkusuusuariorol",
  as: "usuarioRoles",
});
UsuarioRol.belongsTo(Usuario, { foreignKey: "fkusuusuariorol", as: "usuario" });

// asociación de uno a muchos
Rol.hasMany(UsuarioRol, { foreignKey: "fkrolusuariorol", as: "usuarioRoles" });
UsuarioRol.belongsTo(Rol, { foreignKey: "fkrolusuariorol", as: "rol" });

//===================RELACIONES USUARIOS COMUNICADOS Y COMENTARIOS =================\\
Usuario.hasMany(Comunicado, {
  foreignKey: "fkusuariocomunicado",
  as: "usuario",
});

Comunicado.belongsTo(Usuario, {
  foreignKey: "fkusuariocomunicado",
  as: "usuario",
});

Comunicado.hasMany(Comentario, {
  foreignKey: "fkcomunicadocoment",
  as: "comentario",
});

Comentario.belongsTo(Comunicado, {
  foreignKey: "fkcomunicadocoment",
  as: "comunicado",
});

Comentario.belongsTo(Usuario, { foreignKey: "fkusuariocoment", as: "usuario" });

Usuario.hasMany(Comentario, {
  foreignKey: "fkusuariocoment",
  as: "comentario",
});

//============================PEI=======================\\

Institucion.hasOne(ProcesoEducativo, {
  foreignKey: "fkinstiprocedu",
  as: "procesoeducativo",
});

ProcesoEducativo.belongsTo(Institucion, {
  foreignKey: "fkinstiprocedu",
  as: "institucion",
});

Pei.belongsTo(ProcesoEducativo, {
  foreignKey: "fkprocedupei",
  as: "procesoeducativo",
});

ProcesoEducativo.hasOne(Pei, { foreignKey: "fkprocedupei", as: "pei" });

ArchivoPei.belongsTo(Pei, { foreignKey: "fkpeiarchivopei", as: "pei" });
Pei.hasOne(ArchivoPei, { foreignKey: "fkpeiarchivopei", as: "archivopei" });

module.exports = {
  Usuario,
  Rol,
  UsuarioRol,
  Comunicado,
  Institucion,
  ProcesoEducativo,
  Pei,
  // ArchivoPei,
};
