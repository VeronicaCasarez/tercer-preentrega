import { CARTDAO } from "../dao/index.js";

async function saveCart(req,res){
    const cart= req.body;
    await CARTDAO.save(cart);
    res.send(cart)
}

async function getAllCarts(req,res){
    const carts = await CARTDAO.getAll();
    res.render ('cart',{carts:carts})
}

async function getCartById(req,res){
    const cid=req.params.cid;
    const cartId = await CARTDAO.getCartId(cid);
    console.log(cartId)
    res.render ('cartid',{carts:cartId})
}

async function updateCart(req,res){
    const cid=req.params.cid;
    const pid=req.params.pid;
    const updateCart = await CARTDAO.addProductToCart(cid,pid);
    console.log(updateCart);
    res.send(updateCart)
   
}

export {saveCart,getAllCarts,getCartById,updateCart}