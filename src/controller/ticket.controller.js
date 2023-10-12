import { TICKETDAO } from "../dao/index.js";
import { USERDAO } from "../dao/index.js";
import { PRODUCTDAO } from "../dao/index.js";

//dependiendo si ticket esa en memory o en mongo llamo a class o memory
async function saveTicket (req,res){
    const ticket= req.body;
    const user = req.user;
    await TICKETDAO.save(user);
    res.json(ticket)
    //res.render('finishPurchase',{ticket:ticket})
    
}

async function getAllTickets(req,res){
    const tickets = await TICKETDAO.getAll();
    res.send(tickets)
    //res.render ('user',{user:users})
}

async function getTicketById(req,res){
    const tid=req.params.tid;
    const ticket = await TICKETDAO.getById(tid);
   
    ticket._id = ticket._id.toString(); 
    
    res.render('finishpurchase',ticket)
  
}

async function getTicketByEmail(req,res){
    const userEmail = req.user.user.user.email;
    const ticket = await TICKETDAO.getByEmail(userEmail);
    ticket._id = ticket._id.toString(); 
    console.log(ticket)
    res.render('finishpurchase',ticket)
  
}
export {saveTicket,getAllTickets,getTicketById,getTicketByEmail}