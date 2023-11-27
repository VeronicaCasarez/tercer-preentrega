import userModel  from "../models/user.model.js"

export default class Users {
    constructor() {
        console.log(`Working users with Database persistence in mongodb`)
    }
    //CREAR USUARIO
    save = async (user) => {
        let result = await userModel.create(user);
        return result;
    }
    //OBTENER TODOS LOS USUARIOS
    getAll= async () => {
        let users = await userModel.find().lean();
        return users;
    }
    //OBTENER USUARIO POR ID
    getById = async(uid) =>{
        let result = await userModel.findById({_id:uid});
        return result;
    };
    //OBTENER EL ID DEL USUARIO POR EMAIL
    getByEmail = async (email) => {
        try {
          const user = await userModel.findOne({ email: email });
          if (user) {
            return user._id; 
          } else {
            return null; 
          }
        } catch (error) {
          throw error; 
        }
      };

      //CAMBIAR ROL DEL USUARIO
      update = async (uid, newRole) => {
        try {
          const result = await userModel.findByIdAndUpdate(uid, { role: newRole });
          return result;
        } catch (error) {
          throw error;
        }
      };

      //SUBIR FOTO DE PERFIL
      upAvatar = async (uid, imagePath) => {
        try {
          const user = await userModel.findById(uid);
          if (!user) {
            throw new Error('Usuario no encontrado');
          }
          user.profileImage = imagePath;
          await user.save();
      
          return { message: 'Ruta de la imagen actualizada correctamente en la base de datos' };
        } catch (error) {
          throw new Error('Error al actualizar la ruta de la imagen en la base de datos');
        }
      };

      //SUBIR DOCUMENTOS
      upDocument = async (uid, documentType, filePath) =>{
      try {
        const user = await userModel.findById(uid);
            if (!user) {
              throw new Error('Usuario no encontrado');
            }
      user.documents.push({
        name: documentType, 
        reference: filePath, 
      });
      console.log("aca toy userdao")
      await user.save();
      
      return { success: true };
    } catch (error) {
      throw new Error('Error al subir el documento: ' + error.message);
    }
  }

    //ELIMINAR USUARIO
    delete = async (uid)=>{
      let userDeleted =await userModel.findByIdAndDelete(uid);
      return userDeleted;

    }
    //   avatar= async (uid) => {
    //     let user = await userModel.find(uid);
    //     const avatar = user.profileImage;
    //     return avatar;
    // }
      

           
}