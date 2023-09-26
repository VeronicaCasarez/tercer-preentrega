import { USERDAO } from "../dao/index.js";

//dependiendo si user esa en memory o en mongo llamo a class o memory
async function saveUser (req,res){
    const user= req.body;
    await USERDAO.save(user);
    res.send(user)
}

async function getAllUsers(req,res){
    const users = await USERDAO.getAll();
    res.send(users)
    //res.render ('user',{user:users})
}

async function getUserById(req,res){
    const uid=req.params.uid;
    const userId = await USERDAO.getUserId(uid);
    console.log(userId);
    return userId;
  
    //res.render ('cartid',{carts:cartId})
}

export {saveUser,getAllUsers,getUserById}