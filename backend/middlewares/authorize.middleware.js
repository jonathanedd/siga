const authorize = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Asegúrate de que el rol del usuario esté disponible en req.user

    if (roles.includes(userRole)) {
      return next();
    } else {
      return res.status(403).json({ message: "Acceso denegado" });
    }
  };
};

module.exports = authorize;
