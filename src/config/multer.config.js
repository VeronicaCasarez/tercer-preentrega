import multer from 'multer';
import path from 'path';
import dotenv from "dotenv";
import { __dirname } from '../utils.js';

// Definición de la función storage que determina la carpeta de destino
function storage(folderName) {
  return multer.diskStorage({
    destination: function (req, file, cb) {

      if (folderName === 'profiles') {
        const uploadPath = ('./public/upload/profiles/' );
        cb(null, uploadPath);
      } else if (folderName === 'products') {
        const uploadPath = ('./public/upload/products/' );
        cb(null, uploadPath);
      } else if (folderName === 'documents') {
        const uploadPath = ('./public/upload/documents/' );
        cb(null, uploadPath);
      } else {
        cb(new Error('Tipo de archivo no válido'));
      }
    },
    filename: function (req, file, cb) {
      let uniqueFilename;
      const userId = req.params.uid ; 
      const documentType = req.body.documentType ;

      if (folderName === 'products') {
      

        uniqueFilename = `${userId}_${file.originalname}`;
      } else {
        // Para profiles y documents, mantenemos la lógica actual
        uniqueFilename = `${userId}_${documentType}_${file.originalname}`;
      }

      cb(null, uniqueFilename);
    },
  });
}

// Configuración de multer para subir diferentes tipos de archivos a diferentes carpetas
export const uploadProfileImage = multer({ storage: storage('profiles') });
export const uploadProductImage = multer({ storage: storage('products') });
export const uploadDocument = multer({ storage: storage('documents') });


// // Configuración de almacenamiento para diferentes carpetas
// const storage = (folderName) => multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, '../public/upload/', ${folderName} );

//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//     const fileExtension = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
//   },
// });

// // Middleware de Multer para diferentes carpetas
// export const uploadProfileImage = multer({ storage: storage('profiles') });
// export const uploadProductImage = multer({ storage: storage('products') });
// export const uploadDocument = multer({ storage: storage('documents') });

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
