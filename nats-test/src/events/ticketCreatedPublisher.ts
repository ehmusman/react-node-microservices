import { Publisher } from "./basePublisher";
import { TicketCreatedEvent } from "./ticketCreatedEvents";
import { Subjects } from "./subjects";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}