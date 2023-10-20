//import { USERDAO } from "../dao/index.js";
import { userService } from "../repositories/services.js";


//GUARDAR UN USUARIO////****** */
const saveUser = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
  
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: "error",
        error: "Incomplete values",
      });
    }
  
    try {
      // Crear un nuevo usuario utilizando el modelo User y el esquema de usuario
      const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password,
      });
  
      // Asociar un carrito vacío al nuevo usuario
      const newCart = new Cart();
      await newCart.save();
      newUser.cart = newCart._id;
  
      // Establecer el rol predeterminado como 'user'
      newUser.role = 'user';

      const createdUser = await userService.createUser(newUser);
  
      res.status(201).json({
        status: "success",
        message: "Usuario creado exitosamente",
        user: createdUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "error",
        error: "No se pudo crear el usuario",
      });
    }
  };
  

//OBTENER TODOS LOS USUARIOS/////**** */
const getAllUsers = async (req, res) => {
    let users = await userService.getAll();
    if (!users)
      return res
        .status(500)
        .send({
          status: "error",
          error: "Couldn't get users due to internal error",
        });
    res.send({ status: "success", payload: users });
  };


 //OBTENER USUARIO POR ID///////*** */
const getUserById = async(req,res)=>{
    const uid=req.params.uid;
    const userId = await userService.getUserId(uid);
    res.send (userId)
}

export {saveUser,getAllUsers,getUserById}