import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { userService } from '../repositories/services.js';

dotenv.config();

// Configuración de Mailtrap
const transporter = nodemailer.createTransport({
  //service:process.env.MAILING_SERVICE,
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILING_USER,
    pass: process.env.MAILING_PASSWORD
  }
});


// Función para enviar correo electrónico por inactividad
async function sendEmail(emailAddress) {
  const mailOptions = {
    from: 'casaresveronica54@gmail.com',
    to: emailAddress,
    subject: 'Eliminación de cuenta por inactividad',
    text: 'Tu cuenta ha sido eliminada debido a la inactividad durante un período de tiempo.'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${emailAddress}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

// Función para enviar correo electrónico cuando se elimino un producto
async function sendEmailToPremium(emailAddress) {

  const mailOptions = {
    from: 'casaresveronica54@gmail.com',
    to: emailAddress,
    subject: 'Eliminación de producto',
    text: 'Se ha eliminado un producto que creaste.'
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${emailAddress}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

// Función para eliminar usuarios inactivos y enviar correos
async function deleteInactiveUsers() {
 const limiteInactividad = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // Últimos 2 días
 //const limiteInactividad = new Date(Date.now() - 30 * 60 * 1000); // Últimos 30 minutos
  try {
    const usuarios = await userService.getAllUsers(); 
    const usuariosInactivos = usuarios.filter(
      user =>
        (user.last_connection < limiteInactividad) && (user.role === 'user' || user.role === 'premium')
    );

    for (const usuario of usuariosInactivos) {
      console.log("aca en mailing")
      await sendEmail(usuario.email); 
      console.log(usuario.email)
      await userService.deleteUser(usuario._id);
      console.log(`Correo enviado y usuario ${usuario.email} eliminado por inactividad`);
    }
  } catch (error) {
    console.error('Error al encontrar usuarios inactivos:', error);
    throw error;
  }
}

// Llamar a la función para eliminar usuarios inactivos y enviar correos
deleteInactiveUsers().catch((error) => {
  console.error('Error al eliminar usuarios inactivos:', error);
});

export{
  deleteInactiveUsers,
  sendEmailToPremium
};