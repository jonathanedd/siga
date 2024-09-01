const express = require("express");
const cors = require("cors");
require("./utils/associations");
const path = require("path");

//Routes
const usuarioRouter = require("./routers/usuario.routes");
const generoRouter = require("./routers/genero.routes");
const registroRouter = require("./routers/registro.routes");
const rolRouter = require("./routers/rol.routes");
const correoRouter = require("./routers/correo.routes");
const loginRouter = require("./routers/login.routes");
const sendGridRouter = require("./routers/sendGrid.routes");
const statisticsRouter = require("./routers/statistic.routes");
const comunicadoRouter = require("./routers/comunicado.routes");
const comentarioRouter = require("./routers/comentario.routes");
const peiRouter = require("./routers/pei.routes");
const archivoPeiRouter = require("./routers/archivoPei.routes");

//middlewares
const { verificarToken } = require("./middlewares/authenticate.middleware");

const app = express();
// app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Cambia esto al dominio de tu frontend
  })
);

const baseRoute = "/api/v2";

app.use(`${baseRoute}/login`, loginRouter);

app.use(verificarToken);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(`${baseRoute}/roles`, rolRouter);
app.use(`${baseRoute}/roles/:id`, rolRouter);
app.use(`${baseRoute}/usuarios`, usuarioRouter);
app.use(`${baseRoute}/generos`, generoRouter);
app.use(`${baseRoute}/correos`, correoRouter);
app.use(`${baseRoute}/registro`, registroRouter);
app.use(`${baseRoute}/usuarionuevo`, usuarioRouter);
app.use(`${baseRoute}/sendgrid`, sendGridRouter);
app.use(`${baseRoute}/statistics`, statisticsRouter);
app.use(`${baseRoute}/comunicado`, comunicadoRouter);
app.use(`${baseRoute}/comentario`, comentarioRouter);
app.use(`${baseRoute}/comentarios`, comentarioRouter);
app.use(`${baseRoute}/pei`, peiRouter);
app.use(`${baseRoute}/archivopei`, archivoPeiRouter);
app.use(`${baseRoute}/proceso-educativo`, peiRouter);

module.exports = { app };
