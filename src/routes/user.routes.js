import { Router } from "express";

import { saveUser,getAllUsers } from "../controller/user.controller.js";

const router = Router();

////////ENTREGA ARQUITECTURA DE CAPAS:////////////////
router.get("/",getAllUsers);
router.post("/",saveUser);

export default router;