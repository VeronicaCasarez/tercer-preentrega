import { Router } from "express";
import { passportCall} from "../utils.js";
import {isAdmin} from "./middlewares.routes.js";
import { getAllProductsForAdmin,saveProduct,deletedProduct,updatedProduct,getProductByIdForAdmin} from "../controller/product.controller.js";


const router = Router();

router.get("/",passportCall('jwt') ,isAdmin,getAllProductsForAdmin);
router.post ("/",passportCall('jwt') ,isAdmin,saveProduct);
router.delete("/:pid",passportCall('jwt') ,isAdmin,deletedProduct);
router.post("/:pid",passportCall('jwt') ,isAdmin,updatedProduct);
router.get ("/:pid",passportCall('jwt') ,isAdmin,getProductByIdForAdmin);


export default router;