import { __dirname } from "../utils.js";
import { passportCall } from "../utils.js";
import jwt from "../config/passport.config.js"

// Middleware para verificar si el usuario está logueado
export function isLoggedIn(req, res, next) {
    if (req.session.user) {
      // Si el usuario está logueado, permite el acceso a la siguiente ruta
      return next();
    } else {
      // Si el usuario no está logueado, redirige al inicio de sesión
      return res.redirect("/");
    }
  }
  

// Middleware de autorización para administradores
export function isAdmin(req, res, next) {

  if (req.user && req.user.user.user.role == 'admin') {
    next(); // El usuario es administrador, permitir acceso
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}

// Middleware de autorización para usuarios premium
export function isPremium(req, res, next) {
  if (req.user && req.user.user.user.role == 'premium') {
    next(); // El usuario es premium, permitir acceso
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}
// Middleware de autorización para usuarios
export function isUser(req, res, next) {

  if (req.user && req.user.user.user.role == 'user') {
    next(); // El usuario es un usuario regular, permitir acceso
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}

export function getUserInSession(req, res, next) {
  const uid=req.user.user.user._id;

  if (uid) {
    
    next(); 
  } else {
    res.status(403).json({ message: 'Acceso no autorizado' });
  }
}


  // Middleware para verificar si el usuario tiene autorizacion, es admin
  export function auth(req, res, next) {
    console.log("sesion",req.user);
    if (req.user && req.user.role === 'admin')  {
       return next();
    }else return res.status(403).json("error de autenticacion");
}


