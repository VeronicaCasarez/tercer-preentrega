import { Router } from "express";
import {  passportCall } from "../utils.js";
import cartModel from "../dao/models/cart.model.js";


const router = Router();

// Ruta de cierre de sesión
router.get("", passportCall('jwt'), async (req, res) => {

  try {
    const cartId=req.user.user.user.cart;
     // Eliminar el carrito de compras
     await cartModel.findByIdAndDelete(cartId);
    // Destruir la sesión 
    req.session.destroy(err => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).json({ respuesta: "Error en el servidor" });
      } else {
         
        // Limpiar el token y cerrar sesión
        res.clearCookie("CoderKeyQueNadieDebeSaber");
        console.log("sesión cerrada");
        res.redirect("/");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error al cerrar sesión" });
  }
});


// router.get("", (req, res) => {
//     req.session.destroy(err => {
//       if (err) {
//         console.error("Error al cerrar sesión:", err);
//         return res.status(500).json({ respuesta: "Error en el servidor" });
//       }
//       else{
//         console.log("sesion cerrada");
//         res.redirect("/"); 
//       }
    
//     });
//   });

  export default router;