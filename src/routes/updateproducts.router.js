import { Router } from "express";
import { passportCall} from "../utils.js";
import {isAdmin,isPremium} from "./middlewares.routes.js";
import { getAllProductsForAdmin,saveProduct,deleteProduct,updateProduct,getProductByIdForAdmin} from "../controller/product.controller.js";


const router = Router();

router.get("/",passportCall('jwt') ,getAllProductsForAdmin);
router.post ("/",passportCall('jwt') ,saveProduct);
router.delete("/:pid",passportCall('jwt') ,deleteProduct);
router.get ("/:pid",passportCall('jwt') ,getProductByIdForAdmin);
router.put("/:pid",passportCall('jwt') , updateProduct);


export default router;