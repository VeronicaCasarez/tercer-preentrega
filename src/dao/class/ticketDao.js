import ticketModel from '../models/ticket.model.js';


//comunicacion con la base de datos
export default class TicketDao {
  async getAll() {
    let tickets= await ticketModel.find({}).lean();
    return tickets;
  }

  async getById(tid) {
      let ticketId= await ticketModel.findById(tid);
      return ticketId;
  };
 

  async newTicket(data) {
    const newTicket = await ticketModel.create(data);
    return newTicket;
  };

  async update(tid, data) {
    const updatedTicket = await ticketModel.findByIdAndUpdate(tid, data, { new: true });
    return updatedTicket;
  };

  async delete(tid) {
    const deletedTicket = await ticketModel.findByIdAndDelete(tid);
    return deletedTicket;
  };
}
