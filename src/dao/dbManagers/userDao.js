import userModel  from "../models/user.model.js"

export default class Users {
    constructor() {
        console.log(`Working users with Database persistence in mongodb`)
    }
    save = async (user) => {
        let result = await userModel.create(user);
        return result;
    }
    getAll= async () => {
        let users = await userModel.find();
        return users.map(user=>user.toObject())
    }
    getById = async(uid) =>{
        let result = await userModel.findById({_id:uid});
        return result;
    };

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
      
      update = async (uid, newRole) => {
        try {
          const result = await userModel.findByIdAndUpdate(uid, { role: newRole });
          return result;
        } catch (error) {
          throw error;
        }
      };

     upAvatar = async (uid, imagePath) => {
        try {
          const user = await userModel.findById(uid);
          if (!user) {
            throw new Error('Usuario no encontrado');
          }
      
          // Actualiza la ruta de la imagen del usuario en la base de datos
          user.profileImage = imagePath;
          await user.save();
      
          return { message: 'Ruta de la imagen actualizada correctamente en la base de datos' };
        } catch (error) {
          throw new Error('Error al actualizar la ruta de la imagen en la base de datos');
        }
      };

      avatar= async (uid) => {
        let user = await userModel.find(uid);
        const avatar = user.profileImage;
        return avatar;
    }
      

      // upAvatar= async (userId, imagePath)=> {
      //   try {
      //     let user = await userModel.findById(userId);
      //     console.log("pathiamge",imagePath)
      //     user.profileImage = imagePath; // Actualizar la ruta de la imagen
                
      //     await userModel.save();
      //     return { message: 'Imagen de perfil subida exitosamente' };
      //   } catch (error) {
      //     throw new Error('Error al subir la imagen de perfil');
      //   }
      // }
      
}