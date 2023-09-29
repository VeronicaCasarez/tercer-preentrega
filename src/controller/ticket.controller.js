import { TICKETDAO } from "../dao/index.js";
import { USERDAO } from "../dao/index.js";

//dependiendo si ticket esa en memory o en mongo llamo a class o memory
async function saveTicket (req,res){
    const ticket= req.body;
    const user = req.user;
    await TICKETDAO.save(user);
    res.json(ticket)
    //res.render('finishPurchase',{ticket:ticket})
    
}

async function getAllTickets(req,res){
    const tickets = awaitTICKETDAO.getAll();
    res.send(tickets)
    //res.render ('user',{user:users})
}

async function getTicketById(req,res){
    const tid=req.params.tid;
    console.log("soy el ticketid",tid)
    const purchase = await TICKETDAO.getById(tid);
    console.log("compra",purchase);
    res.send( purchase)
   // res.render('finishpurchase',{purchase:purchase})
  
}

async function getTicketByEmail(req,res){
    const userEmail = req.user.user.user.email;
    
    const ticket = await TICKETDAO.getByEmail(userEmail);
    console.log("estoy buscando el ticket",ticket);
    //res.send( ticket)
    res.render('finishpurchase',{purchase:ticket})
  
}
export {saveTicket,getAllTickets,getTicketById,getTicketByEmail}