//import { USERDAO } from "../dao/index.js";
import { userService } from "../repositories/services.js";
import multer from 'multer';
import notifier from 'node-notifier';


// Configuración de Multer para la subida de imágenes de perfil
const profileImageUpload = multer({ dest: 'public/upload/profiles/' });

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
    let users = await userService.getAllUsers();
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
    const userId = await userService.getUserById(uid);
    res.send (userId)
}

//OBTENER USUARIO POR ID PARA CAMBIAR ROL///////*** */
const getUserForChange = async(req,res)=>{
  const uid=req.params.uid;
  const userId = await userService.getUserById(uid);
  res.render ('changerole',{userId})
}

//CAMBIAR ROL DE USUARIO///////*** */
const changeRoleUser = async(req,res)=>{
  const uid=req.params.uid;
  const {newRole}=req.body;
  // Obtener información sobre la carga de documentos del usuario
 const user = await userService.getUserById(uid);
    
 // Verificar la existencia de los documentos requeridos
 const requiredDocuments = ['identification', 'addressProof', 'bankStatement'];
 const hasRequiredDocuments = requiredDocuments.every(documentType =>
   user.documents.some(document => document.name === documentType)
 );

 if (hasRequiredDocuments) {
   // Cambiar el rol del usuario solo si ha cargado los documentos
   const updatedUser = await userService.updateUser(uid, newRole);
   
    res.send (updatedUser)
  }
}

//OBTENER USUARIO POR EMAIL///////*** */
const getUserByEmail = async(req,res)=>{
  const email=req.params.userEmail;
  const userId = await userService.getUserIdByEmail(email);
  res.send (userId)
};

//IR A LA RUTA DE SUBIR DOCUMENTOS
const goUpDocument =async(req,res)=>{
  const uid=req.params.uid;
  const userId = await userService.getUserById(uid);
  res.render ('updocument',{userId})
};

//GUARDAR LA IMAGEN DE PERFIL CON MULTER
const uploadProfileUser = async (req, res) => {
  try {
    const userId = req.params.uid; 
    const imagePath = req.file.path; // Multer guarda la información del archivo en req.file
    console.log("userid",userId)

    console.log("ruta",imagePath)
    const result = await userService.uploadProfileUser(userId, imagePath);
    console.log("result",result)
    
    notifier.notify({
      title: 'Hermosa foto',
      message: 'Tu imagen fue agregada al perfil'
      
    });
   
    res.redirect(303, `/api/users/${userId}/profile`);
  } catch (error) {
    
    res.status(500).json({ error: 'Error interno del servidor al subir la imagen de perfil' });
  }
   
};


// //SUBIR DOCUMENTOS CON MULTER
const uploadDocument = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await userService.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Procesar cada archivo y actualizar el modelo del usuario
    req.files.forEach(file => {
      const documentType = file.fieldname;
      // Actualizar el modelo del usuario con la información del documento
      user.documents.push({
        name: file.originalname,
        reference: `link/al/documento/${file.originalname}`
      });
    });

    // Guardar los cambios en el usuario
    await userService.uploadDoc(uid,);

    return res.status(200).json({ message: "Documentos subidos exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

//IR AL PERFIL
const getProfile =async(req,res)=>{
  const userId=req.params.uid;
  const profile= await userService.getUserById(userId);
  console.log("estoy en el profile",profile)
  res.render('profile',profile)
};

//OBTENER EL AVATAR
const getAvatar =async(req,res)=>{
  const userId=req.params.uid;
  const showAvatar= await userService.getAvatar(userId);
 
  res.send(showAvatar)
}

export {saveUser,
  getAllUsers,
  getUserById,
  changeRoleUser,
  getUserForChange,
  getUserByEmail,
  goUpDocument,
  uploadDocument,
  getProfile,
  uploadProfileUser,
  getAvatar}