import { Router } from "express";
import multer from 'multer';
import { saveUser,getAllUsers,getUserById,changeRoleUser, getUserForChange,getUserByEmail,goUpDocument,uploadDocument } from "../controller/user.controller.js";
import { passportCall } from "../utils.js";
import { isUser,isAdmin } from "./middlewares.routes.js";

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
router.get("/:uid/documents",passportCall("jwt"),goUpDocument)
router.post("/:uid/documents", passportCall("jwt"), upload.array('documents'), uploadDocument);


export default router;