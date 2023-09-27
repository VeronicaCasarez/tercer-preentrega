import { Router } from "express";
import { __dirname } from "../utils.js";
import { passportCall} from "../utils.js";
import {isAdmin} from "./middlewares.routes.js";
import { getUserById } from "../controller/user.controller.js";

const router =Router()

router.get('/', passportCall('jwt') ,isAdmin,(req, res) => {

  const { user } = req;
  console.log( "prueba",user.user.user.role);
 
  res.json({ message: "usuario autorizado ", user});
  //res.render('private',{})
    });


export default router;





