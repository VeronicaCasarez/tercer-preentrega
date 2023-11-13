import { cartService, userService } from "../repositories/services.js";



const logoutSession = async (req, res) => {
  try {
    const cartId = req.user.user.user.cart;
    console.log("aca en el loguot", cartId);

    // Obtener el usuario actual
     const user = req.user;

    // Actualizar last_connection antes de destruir la sesión
    user.last_connection = new Date();
    await userService.updateUser();

    // Eliminar el carrito de compras
    await cartService.deleteCart(cartId);

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
};

export { logoutSession };
