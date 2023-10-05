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
    console.log("prueba producto para admin",productById)
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