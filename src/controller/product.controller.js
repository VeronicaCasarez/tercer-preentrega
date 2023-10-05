import { PRODUCTDAO, USERDAO } from "../dao/index.js";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { generateProductErrorInfo } from "../services/info.js";


async function saveProduct (req,res){
        try {
            const product = req.body;
            if (!product || !product.name || !product.description || !product.price || !product.category || !product.availability) {
                throw new CustomError(EErrors.InvalidData, "Los datos del producto son inválidos.");
            }
    
            await PRODUCTDAO.save(product);
            res.send(product);
        } catch (error) {
            if (error instanceof CustomError) {
                const errorInfo = generateProductErrorInfo(error);
                res.status(errorInfo.statusCode).json(errorInfo);
            } else {
                console.error("Error no controlado:", error);
                res.status(500).json({ message: "Error interno del servidor." });
            }
        }
}


async function getAllProducts(req,res){
    const products = await PRODUCTDAO.getAll();
    const user=req.user;
    const cartId=req.user.user.user.cart;
    const userRole = user.user.user.role;
    const showEditButton = userRole === 'admin';

    res.render ('product',{products:products,user: user,cartId:cartId,showEditButton})
}

async function getAllProductsForAdmin(req,res){
    const products = await PRODUCTDAO.getAll();
    res.render ('updateproducts',{products:products })
}

async function getProductByIdForAdmin(req,res){
    const pid= req.params.pid;
    const productById = await PRODUCTDAO.getById(pid);
    productById._id = productById._id.toString(); 
    
    res.render ('updateoneproduct',{productById})
}

async function getProductById(req,res){
    const pid= req.params.pid;
    const productById = await PRODUCTDAO.getById(pid);
    productById._id = productById._id.toString(); 
    res.render('productdetail', productById);

   
}


async function deletedProduct(req,res){
    const {pid}= req.params;
    const productId = await PRODUCTDAO.delete(pid);
    res.send (productId)
}


async function updateProduct(req,res){
    const {pid} = req.params;
    const productToUpdated= req.body;
    const productUpdated = await PRODUCTDAO.update(pid,productToUpdated);
    console.log(productToUpdated)
    res.send (productUpdated)
}

export {saveProduct,getAllProducts,getProductById, deletedProduct,updateProduct,getAllProductsForAdmin,getProductByIdForAdmin}