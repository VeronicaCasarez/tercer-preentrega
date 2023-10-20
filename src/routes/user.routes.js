import { Router } from "express";

import { saveUser,getAllUsers,getUserById } from "../controller/user.controller.js";

const router = Router();

////////ENTREGA ARQUITECTURA DE CAPAS:////////////////
router.get("/",getAllUsers);
router.post("/",saveUser);
router.get("/:uid",getUserById);


export default router;