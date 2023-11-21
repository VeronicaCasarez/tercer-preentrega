import { Router } from "express";
import multer from 'multer';
import { saveUser,
    getAllUsers,
    getUserById,
    changeRoleUser, 
    getUserForChange,
    getUserByEmail,
    goUpDocument,
    uploadDocument,
    getProfile,
    uploadProfileUser} from "../controller/user.controller.js";
import { passportCall } from "../utils.js";
import { isUser,isAdmin } from "./middlewares.routes.js";
import { uploadProfileImage } from "../config/multer.config.js";

const router = Router();

// Configuración de Multer para manejar la carga de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/",getAllUsers);
router.post("/",saveUser);
router.get("/:uid",getUserById);
router.get("/premium/:uid",passportCall("jwt"),getUserForChange);
router.post("/premium/:uid",passportCall("jwt"),changeRoleUser);
router.get("/byemail/:userEmail",passportCall("jwt"),getUserByEmail);
router.get("/:uid/documents",passportCall("jwt"),goUpDocument);
router.post('/:uid/upload-avatar', uploadProfileImage.single('profiles'), uploadProfileUser);

router.post("/:uid/documents", passportCall("jwt"), upload.array('documents'), uploadDocument);
router.get("/:uid/profile",passportCall("jwt"),getProfile)

export default router;