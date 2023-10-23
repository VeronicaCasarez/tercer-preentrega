import ticketModel from '../models/ticket.model.js';

export default class TicketDao {
    constructor() {
      console.log(`Working users with Database persistence in mongodb`);
    }
    save = async (data) => {
      const newTicket = await ticketModel.create(data);
      return newTicket;
    };

    getAll = async () => {
      let tickets = await ticketModel.find({}).lean();
      return tickets;
    };

    getById = async (tid) => {
      let ticketId = await ticketModel.findById({ _id: tid });
      return ticketId;
    };

    getByEmail = async (userEmail) => {
      let ticket = await ticketModel.findOne({ purchaser: userEmail });
      return ticket;
    };

    update = async (tid, data) => {
      const updatedTicket = await ticketModel.findByIdAndUpdate(tid, data, { new: true });
      return updatedTicket;
    };

    delete = async (tid) => {
      const deletedTicket = await ticketModel.findByIdAndDelete(tid);
      return deletedTicket;
    };
}
