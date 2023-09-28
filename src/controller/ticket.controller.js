import { TICKETDAO } from "../dao/index.js";


//dependiendo si ticket esa en memory o en mongo llamo a class o memory
async function saveTicket (req,res){
    const ticket= req.body;
    const user = req.user;
    await TICKETDAO.save(user);
    res.send(ticket)
    // res.render('finishPurchase',{ticket:ticket})
    
}

async function getAllTickets(req,res){
    const tickets = awaitTICKETDAO.getAll();
    res.send(tickets)
    //res.render ('user',{user:users})
}

async function getTicketById(req,res){
    const tid=req.params.tid;
    const ticketId = await TICKETDAO.getTicketId(tid);
    console.log(ticketId);
    return ticketId;
  
}

export {saveTicket,getAllTickets,getTicketById}