import { CARTDAO } from "../dao/index.js";

async function saveCart(req,res){
    const cart= req.body;
    await CARTDAO.save(cart);
    res.send(cart)
}

async function getAllCarts(req,res){
    const carts = await CARTDAO.getAll();
    res.send (carts)
}

async function getCartById(req,res){
    const cid=req.params.cid;
    const cartId = await CARTDAO.getCartId(cid);
    res.render ('cart',{carts:cartId})
}

export {saveCart,getAllCarts,getCartById}