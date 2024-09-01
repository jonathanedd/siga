const { app } = require("./app");
const db = require("./utils/database");
require("./utils/associations");

const port = 4000;

db.sync({ force: false }) // Asegúrate de no usar { force: true } en producción ya que borrará todos los datos
  .then(() => {
    app.listen(port, () => {
      console.log("Servidor ejecutándose en el puerto 4000");
    });
  })
  .catch((err) => console.error("Error al sincronizar la base de datos:", err));

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("Hello world");
});

const databaseConnection = () => {
  try {
    db.authenticate();
    console.log("Conexion exitosa a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la bse de datos", error);
  }
};

databaseConnection();

// app.listen(port, () => {
//   console.log(`App listening on port: ${port}`);
// });
