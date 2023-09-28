import { CARTDAO } from "../dao/index.js";
import { TICKETDAO } from "../dao/index.js";

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

async function generatedTicket(req,res){
    const user=req.user;
    const randomCode = getRandomInt(1000, 9999); 
    
    const newTicket = {
        code:randomCode,
        purchase_datetime: new Date(),
        amount:50,
        purchaser: user.user.user.email
    }
    const ticket = TICKETDAO.newTicket(newTicket)
    res.json({status: "Success", ticket})
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  


export {saveCart,getAllCarts,getCartById,updateCart,generatedTicket}