export default class UserDTO {
  constructor(user) {
    this.first_name = user.user.user.first_name;
    this.last_name = user.user.user.last_name;
    this.email = user.user.user.email;
    this.role = user.user.user.role;
  }
}

export function createUserDTO(reqUser) {
  if (!reqUser || !reqUser.user || !reqUser.user.user) {
    return null; 
  }
  const userDTO = new UserDTO(reqUser); 
  return userDTO;
}


// export default class UserDTO {
//     constructor(user) {
//       console.log( "en dto",user)
//       this.first_name= user.user.first_name;
//       this.last_name_name= user.user.last_name;
//       this.email= user.user.email;
//       this.role= user.user.role;
      
//     }
//   }

//   export function createUserDTO(reqUser) {
//     console.log("encreateuserdto", reqUser)
//     if (!reqUser || !reqUser.user || !reqUser.user.user) {
//       return null; 
//     }
  
//     const { first_name, email, role } = reqUser.user.user; 
//   }
  