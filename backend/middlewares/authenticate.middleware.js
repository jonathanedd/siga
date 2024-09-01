const jwt = require("jsonwebtoken");

//associations
const { Usuario, Rol } = require("../utils/associations");

//generate token
const generateToken = async (usuario, rol) => {
  const payload = {
    idusuario: usuario.idusuario,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    rol: rol,
  };
  const token = jwt.sign(payload, "secreto", { expiresIn: "1h" });
  console.log("Token generado: ", token, "ROL GENERATED:", rol);
  return token;
};

//validate and authenticate token
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("MIDDLEWARE TOKEN: Encabezado de autorización:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token" });
  }
  // const token = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  console.log("TOKEN RECIBIDO", token);
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  jwt.verify(token, "secreto", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Error verifying token" });
    }

    req.usuario = decoded;

    next();
  });
};

//verify role
// const verificarRol = (rolesPermitidos) => {
//   return (req, res, next) => {
//     const { rol } = req.usuario;

//     console.log("ROL VERIFICADO", rol);

//     if (!rolesPermitidos.includes(rol)) {
//       return res
//         .status(403)
//         .json({ message: "You do not have permission to this route" });
//     }
//     next();
//   };
// };

const verificarRol = (rolesPermitidos) => {
  return async (req, res, next) => {
    try {
      const idusuario = req.usuario.idusuario;
      const usuario = await Usuario.findByPk(idusuario, {
        include: {
          model: Rol,
          as: "roles",
          through: { attributes: [] }, // Excluye los atributos de la tabla intermedia
        },
      });

      if (!usuario) {
        return res.status(401).json({ message: "Usuario no autorizado" });
      }

      const rolesUsuario = usuario.roles.map((rol) => rol.descripcionrol);
      const tienePermiso = rolesUsuario.some((rol) =>
        rolesPermitidos.includes(rol)
      );

      if (!tienePermiso) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para realizar esta acción" });
      }

      next();
    } catch (error) {
      console.error("Error al verificar el rol:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
};

module.exports = { verificarToken, verificarRol, generateToken };
