import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import { updateCartErrorInfo } from "../services/info.js";
import { cartService } from "../repositories/services.js";
import { productService } from "../repositories/services.js";
import { ticketService } from "../repositories/services.js";

//CREAR CARRITO////**** */
const saveCart = async (req, res) => {
  const cart = req.body;
  await cartService.createCart(cart);
  res.send(cart);
};

//OBTENER TODOS LOS CARRITOS///*** NO LA USO */
const getAllCarts = async (req, res) => {
  const carts = await cartService.getAllCarts();
  res.render("cart", { carts: carts });
};

//OBTENER EL CARRITO POR ID//**** */
const getCartById = async (req, res) => {
  const cid = req.params.cid;
  const cartById = await cartService.getCartById(cid);

  cartById._id = cartById._id.toString();
  let newCart = {
    _id: cartById._id,
    products: cartById.products.map((product) => {
      return {
        _id: product.product._id,
        name: product.product.name,
        description: product.product.description,
        price: product.product.price,
        category: product.product.category,
        availability: product.product.availability,
        quantity: product.quantity,
      };
    }),
    total: cartById.total,
  };
  console.log(newCart);
  res.render("cart", newCart);
};

//ACTUALIZAR CARRITO ////**** */
const updateCart = async (req, res) => {
  const cid = req.user.user.user.cart;
  const pid = req.params.pid;

  console.log("estoy en el controlador 1", cid, pid);
  try {
    const productInCart = await cartService.isProductInCart(cid, pid);
    console.log("estoy en el controlador 2", productInCart);

    if (productInCart) {
      console.log("estoy en el controlador, soy el product in cart", productInCart);
      return cartService.incrementProductQuantity(cid, pid);
    } else {
      return cartService.addProductToCart(cid, pid);
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    throw error;
  }
};

//GENERAR TICKET///*** */
const generatedTicket = async (req, res) => {
  const user = req.user;
  const cid = req.params.cid;
  const cart = await cartService.getCartById(cid);
  const randomCode = getRandomInt(1000, 9999);

  const newTicket = {
    code: randomCode,
    purchase_datetime: new Date(),
    amount: cart.total,
    purchaser: user.user.user.email,
  };
  const ticket = ticketService.createTicket(newTicket);

  const productsNotPurchased = [];

  for (const item of cart.products) {
    const productId = item.product;
    const quantity = item.quantity;

    const product = await productService.getProductById(productId);

    if (!product) {
      productsNotPurchased.push({
        productId,
        reason: "Producto no encontrado",
      });
      continue;
    }

    if (product.availability < quantity) {
      productsNotPurchased.push({
        productId,
        reason: "Disponibilidad insuficiente",
      });
      continue;
    }

    product.availability -= quantity;
    await product.save();
    await cartService.removeProductFromCart(cid, product.id);
  }
  res.send(ticket);
};

//ELIMINAR CARRITO///*** */
const deleteCart = async (cartId) => {
  try {
    const existingCart = await cartService.getCartById(cartId);

    if (!existingCart) {
      throw new Error("Carrito no encontrado");
    }
    await cartService.deleteCart(cartId);
  } catch (error) {
    console.error("Error al eliminar el carrito", error);
    throw error;
  }
};

export { saveCart, getAllCarts, getCartById, updateCart, generatedTicket, deleteCart };


//DESAFIO MANEJO DE ERRORRES
// async function updateCart(req, res) {
//   try {
//     const cid = req.user.user.user.cart;
//     const pid = req.params.pid;
//     const product = await productService.getProductById(pid);

//     if (
//       !product ||
//       !product.name ||
//       !product.description ||
//       !product.price ||
//       !product.category ||
//       !product.availability
//     ) {
//       throw new CustomError(
//         EErrors.InvalidData,
//         "El producto es inválido o tiene datos faltantes."
//       );
//     }

//     const updateCart = await cartService.addProductToCart(cid, pid);
//     console.log(updateCart);
//     res.send(updateCart);
//   } catch (error) {
//     // if (error instanceof CustomError) {
//     //   const errorInfo = updateCartErrorInfo(error);
//     //   res.status(errorInfo.statusCode).json(errorInfo);
//     // } else {
//       console.error("Error no controlado:", error);
//       res.status(500).json({ message: "Error interno del servidor." });
//     // }
//   }
// }

