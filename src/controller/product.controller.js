import { PRODUCTDAO, USERDAO } from "../dao/index.js";


async function saveProduct (req,res){
    const product= req.body;
    await PRODUCTDAO.save(product);
    res.send(product)
}

async function getAllProducts(req,res){
    const products = await PRODUCTDAO.getAll();
    const user=req.user;
    const cartId=req.user.user.user.cart;
    res.render ('product',{products:products,user: user,cartId:cartId})
}

async function getAllProductsForAdmin(req,res){
    const products = await PRODUCTDAO.getAll();
     
    res.render ('updateproducts',{products:products })
}
async function getProductById(req,res){
    const pid= req.params.pid;
    const productById = await PRODUCTDAO.getById(pid);
    console.log("prueba producto",productById)
    res.render ('productdetail',{products:productById})
}


async function deletedProduct(req,res){
    const {pid}= req.params;
    const productId = await PRODUCTDAO.delete(pid);
    res.send (productId)
}


async function updatedProduct(req,res){
    const pid = req.params;
    const productToUpdated= req.body;
    const productUpdated = await PRODUCTDAO.update(pid,productToUpdated);
    res.send (productUpdated)
}

export {saveProduct,getAllProducts,getProductById, deletedProduct,updatedProduct,getAllProductsForAdmin}