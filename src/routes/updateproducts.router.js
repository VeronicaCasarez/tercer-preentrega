import { Router } from "express";
import { passportCall} from "../utils.js";
import {isAdmin} from "./middlewares.routes.js";
import { getAllProductsForAdmin,saveProduct,deletedProduct} from "../controller/product.controller.js";


const router = Router();

router.get("/",passportCall('jwt') ,isAdmin,getAllProductsForAdmin);
router.post ("/",passportCall('jwt') ,isAdmin,saveProduct);
router.delete("/:pid",passportCall('jwt') ,isAdmin,deletedProduct);


export default router;