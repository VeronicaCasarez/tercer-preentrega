import { CARTDAO } from "../dao/index.js";
import { TICKETDAO } from "../dao/index.js";
import { PRODUCTDAO } from "../dao/index.js";


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
    console.log("carrito en el controller",cartId)
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

async function generatedTicket(req, res) {
    try {
      const user = req.user;
      const cid = req.params.cid;
      const cart = await CARTDAO.getCartId(cid);
      const randomCode = getRandomInt(1000, 9999);
  
      // Recorre los productos en el carrito
      for (const item of cart.products) {
        const productId = item.product;
        const quantity = item.quantity;
  
        // Verifica si hay suficiente disponibilidad
        const product = await PRODUCTDAO.getById(productId);
  
        if (!product) {
          return res.status(404).json({ message: "Producto no encontrado" });
        }
  
        if (product.availability < quantity) {
          return res.status(400).json({ message: "No hay suficiente disponibilidad para algunos productos en el carrito" });
        }
  
        // Descuenta la cantidad del producto
        product.availability -= quantity;
  
        // Guarda la actualización en la base de datos
        await product.save();
      }
  
      // Crea el nuevo ticket después de descontar la disponibilidad
      const newTicket = {
        code: randomCode,
        purchase_datetime: new Date(),
        amount: cart.total,
        purchaser: user.user.user.email
      };
  
      const ticket = await TICKETDAO.newTicket(newTicket);
  
      res.json({ message: "Ticket generado exitosamente", ticket });
    } catch (error) {
      console.error("Error al generar el ticket:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
  
// async function generatedTicket(req,res){
//     const user=req.user;
//     const cid=req.params.cid;
//     const cart = await CARTDAO.getCartId(cid);
//     const randomCode = getRandomInt(1000, 9999); 
    
//     const newTicket = {
//         code:randomCode,
//         purchase_datetime: new Date(),
//         amount:cart.total,
//         purchaser: user.user.user.email
//     }
//     const ticket = TICKETDAO.newTicket(newTicket)
//     res.send( ticket)
// }


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  


export {saveCart,getAllCarts,getCartById,updateCart,generatedTicket}