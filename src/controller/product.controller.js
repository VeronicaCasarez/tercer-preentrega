import { PRODUCTDAO } from "../dao/index.js";

async function saveProduct (req,res){
    const product= req.body;
    await PRODUCTDAO.save(product);
    res.send(product)
}

async function getAllProducts(req,res){
    const products = await PRODUCTDAO.getAll();
    res.render ('product',{products:products})
}

async function getProductById(req,res){
    const pid= req.params.pid;
    const productId = await PRODUCTDAO.getById(pid);
    res.render ('productdetail',{product:productId})
}


async function deletedProduct(req,res){
    const {pid}= req.params;
    const productId = await PRODUCTDAO.delete(pid);
    res.send (productId)
}

export {saveProduct,getAllProducts,getProductById, deletedProduct}