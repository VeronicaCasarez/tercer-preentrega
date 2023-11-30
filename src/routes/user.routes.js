import { Router } from "express";
import multer from 'multer';
import { saveUser,
    getAllUsers,
    getUserById,
    changeRoleUser, 
    getUserForChange,
    getUserByEmail,
    goUpDocument,
    uploadDocumentUser,
    getProfile,
    uploadProfileUser,
    deleteUser,
    } from "../controller/user.controller.js";
import { passportCall } from "../utils.js";
import { isUser,isAdmin } from "./middlewares.routes.js";
import { uploadProfileImage,uploadDocument } from "../config/multer.config.js";

const router = Router();

// Configuración de Multer para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/",passportCall('jwt'),isAdmin,getAllUsers);
router.post("/",saveUser);
router.get("/:uid",getUserById);
router.delete("/:uid",deleteUser);
router.get("/premium/:uid",passportCall("jwt"),getUserForChange);
router.post("/premium/:uid",passportCall("jwt"),changeRoleUser);
router.get("/byemail/:userEmail",passportCall("jwt"),getUserByEmail);
router.get("/:uid/documents",passportCall("jwt"),goUpDocument);
router.get("/:uid/profile/",passportCall("jwt"),getProfile);
//router.get("/public/upload/profiles/",passportCall("jwt"),getAvatar);
router.post('/:uid/upload-avatar/', uploadProfileImage.single('profiles'), uploadProfileUser);

//router.post("/:uid/upload-documents/",  uploadDocument.array('documents'), uploadDocumentUser);
router.post("/:uid/upload-documents/", uploadDocument.single('documents'), uploadDocumentUser); // Usar single para manejar un solo archivo


export default router;