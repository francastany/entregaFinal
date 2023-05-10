import ticketModel from "./Mongo/models/Ticket.js";

export default class TicketsDAO {
    getTickets = () => {
        return ticketModel.find().lean();
    };
    getTicketBy = (params) => {
        return ticketModel.findOne(params).lean();
    };
    createTicket = (ticket) => {
        return ticketModel.create(ticket);
    };
}
