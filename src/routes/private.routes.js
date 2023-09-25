import { Router } from "express";
import { __dirname } from "../utils.js";
import { passportCall,authorization} from "../utils.js";
import {isAdmin} from "./middlewares.routes.js";

const router =Router()

router.get('/', passportCall('jwt') ,authorization,(req, res) => {
  const { user } = req;
  res.json({ message: "usuario autorizado ",user });
  //res.render('private',{})
    });


export default router;





