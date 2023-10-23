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
    }
    update = async(id,user) =>{
        delete user._id;
        let result = await userModel.updateOne({_id:id},{$set:user})
        return result;
    }
}