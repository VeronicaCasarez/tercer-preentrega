import multer from 'multer';
import path from 'path';
import dotenv from "dotenv";
import { __dirname } from '../utils.js';

// Configuración de almacenamiento para diferentes carpetas
const storage = (folderName) => multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/upload/' );

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  },
});

// Middleware de Multer para diferentes carpetas
export const uploadProfileImage = multer({ storage: storage('profiles') });
export const uploadProductImage = multer({ storage: storage('products') });
export const uploadDocument = multer({ storage: storage('documents') });

// // multerConfig.js
// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Define la carpeta de destino para almacenar archivos
//     cb(null, '/public/upload/profile'); 
//   },
//   filename: function (req, file, cb) {
//     // Define el nombre de archivo deseado
//     cb(null, file.fieldname);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;



// // // multerConfig.js
// import multer from 'multer';
// import path from 'path';
// import dotenv from "dotenv";

// // Configuración de almacenamiento para diferentes carpetas
// const storage = (folderName) => multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, `/public/upload/profile/${folderName}`);
//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//         // Define el nombre de archivo deseado
//         cb(null, file.fieldname);
//       },
// });

// //Middleware de Multer para diferentes carpetas
// export const upload =multer({storage:storage('avatar')})
// export const uploadProfileImage = multer({ storage: storage('profiles') });
// export const uploadProductImage = multer({ storage: storage('products') });
// export const uploadDocument = multer({ storage: storage('documents') });
