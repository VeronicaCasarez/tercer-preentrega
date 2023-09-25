import { Router } from "express";
import { getAllProductsForAdmin,saveProduct,deletedProduct} from "../controller/product.controller.js";


const router = Router();

router.get("/",getAllProductsForAdmin);
router.post ("/",saveProduct);
router.delete("/:pid",deletedProduct);


export default router;