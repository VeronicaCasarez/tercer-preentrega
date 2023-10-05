import { CARTDAO } from "../dao/index.js";
import { TICKETDAO } from "../dao/index.js";
import { PRODUCTDAO } from "../dao/index.js";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { updateCartErrorInfo } from "../services/info.js";


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
    const cartById = await CARTDAO.getCartId(cid);
    cartById._id = cartById._id.toString(); 
    console.log("carrito en el controller",cartById)
    
    res.render ('cart',cartById)
        
}

// async function updateCart(req,res){
//     const cid=req.user.user.user.cart;
//     const pid=req.params.pid;
//     const updateCart = await CARTDAO.addProductToCart(cid,pid);
//     console.log(updateCart);
//     res.send(updateCart)
   
// }

//DESAFIO MANEJO DE ERRORRES
async function updateCart(req, res) {
  try {
      const cid = req.user.user.user.cart;
      const pid = req.params.pid;
      const product = await PRODUCTDAO.getById(pid);

      if (!product || !product.name || !product.description || !product.price || !product.category || !product.availability) {
          throw new CustomError(EErrors.InvalidData, "El producto es inválido o tiene datos faltantes.");
      }

      const updateCart = await CARTDAO.addProductToCart(cid, pid);
      console.log(updateCart);
      res.send(updateCart);
  } catch (error) {
      if (error instanceof CustomError) {
          const errorInfo = updateCartErrorInfo(error);
          res.status(errorInfo.statusCode).json(errorInfo);
      } else {
          console.error("Error no controlado:", error);
          res.status(500).json({ message: "Error interno del servidor." });
      }
  }
}

  
async function generatedTicket(req,res){
    const user=req.user;
    const cid=req.params.cid;
    const cart = await CARTDAO.getCartId(cid);
    const randomCode = getRandomInt(1000, 9999); 
    
    const newTicket = {
        code:randomCode,
        purchase_datetime: new Date(),
        amount:cart.total,
        purchaser: user.user.user.email
    }
    const ticket = TICKETDAO.newTicket(newTicket)

    const productsNotPurchased = [];
  
    // Recorre los productos en el carrito
    for (const item of cart.products) {
      const productId = item.product;
      const quantity = item.quantity;

      // Verifica si hay suficiente disponibilidad
      const product = await PRODUCTDAO.getById(productId);

      if (!product) {
        productsNotPurchased.push({ productId, reason: "Producto no encontrado" });
        continue; // Continuar con el siguiente producto
      }

      if (product.availability < quantity) {
        productsNotPurchased.push({ productId, reason: "Disponibilidad insuficiente" });
        continue; // Continuar con el siguiente producto
      }

      // Descuenta la cantidad del producto
      product.availability -= quantity;
       // Guarda la actualización en la base de datos
       await product.save();
      // Elimina el producto comprado del carrito
      await CARTDAO.removeFromCart(cid, product.id);
     
    }
    res.send( ticket)
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  


export {saveCart,getAllCarts,getCartById,updateCart,generatedTicket}