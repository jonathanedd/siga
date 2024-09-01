// const multer = require("multer");
// const path = require("path");

// // Configuración de almacenamiento
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads")); // Ruta correcta al directorio uploads
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`); // Nombre único para el archivo
//   },
// });

// // Crear instancia de multer con configuración
// const upload = multer({ storage: storage });

// module.exports = upload;

// utils/multer.js
// const multer = require("multer");

// const storage = multer.memoryStorage(); // Use memoryStorage for storing file data in memory

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf/;
//     const extname = filetypes.test(file.originalname.toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error("Error: Solo archivos PDF permitidos"));
//     }
//   },
// });

// module.exports = upload;

const multer = require("multer");
const path = require("path");

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
