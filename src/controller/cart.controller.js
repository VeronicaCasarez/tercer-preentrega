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
    console.log("en el controller",cartId)
    res.render ('cart',{carts:cartId})
    //res.send(cartId)
}

async function updateCart(req,res){
    const cid=req.user.user.user.cart;
    const pid=req.params.pid;
    const updateCart = await CARTDAO.addProductToCart(cid,pid);
    console.log(updateCart);
    res.send(updateCart)
   
}
//hasta ahora no la use 
async function purchaseCart(req,res){
    const cid=req.params.cid;
    const cartId = await CARTDAO.getCartId(cid);
    
    res.render ('purchaseCart',{carts:cartId})
}


export {saveCart,getAllCarts,getCartById,updateCart,purchaseCart}