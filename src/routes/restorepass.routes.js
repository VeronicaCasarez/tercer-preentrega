import { Router } from "express";
import userModel from '../dao/models/user.model.js'

const router = Router();

router.get("", (req, res) => {
  res.render("restore", {
    title: "Restaurar tu contrasena?",
  });
});


router.post("/sendmail", async (req, res) => {
    const email = req.body.email; // Obtén el correo electrónico del formulario
  
    // Verifica si el correo existe en tu base de datos de usuarios
    const user = await userModel.findOne({ email }); 
  
    if (!user) {
      return res.status(400).json({ success: false, message: "Correo electrónico no encontrado" });
    }
  
    // Genera un enlace de recuperación con un token único y establece una hora de expiración
    const token = generateUniqueToken();
    const expirationTime = new Date(); // Calcula la hora de expiración
    expirationTime.setHours(expirationTime.getHours() + 1);
  
    // Guarda el token y la hora de expiración en tu base de datos
    user.resetPasswordToken = token;
    user.resetPasswordExpiration = expirationTime;
    await user.save();
  
    // Envía el correo de recuperación
    const recoveryLink = `URL_BASE_DEL_SITIO/reset-password/${token}`;
    enviarCorreoRecuperacion(email, recoveryLink);
  
    res.json({ success: true, message: "Correo de recuperación enviado" });
  });
  
export default router;