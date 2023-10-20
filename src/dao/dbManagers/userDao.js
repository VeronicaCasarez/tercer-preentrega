import userModel  from "../models/user.model.js"

export default class Users {
    constructor() {
        console.log(`Working users with Database persistence in mongodb`)
    }
    getAll= async () => {
        let users = await userModel.find();
        return users.map(user=>user.toObject())
    }
    saveUser = async (user) => {
        let result = await userModel.create(user);
        return result;
    }
    getUserById = async(uid) =>{
        let result = await userModel.findById({_id:uid});
        return result;
    }
    updateUser = async(id,user) =>{
        delete user._id;
        let result = await userModel.updateOne({_id:id},{$set:user})
        return result;
    }
}