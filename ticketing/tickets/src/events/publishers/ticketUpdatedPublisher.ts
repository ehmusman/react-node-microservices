import { Publisher, Subjects, TicketUpdatedEvent } from "@usman-bakhsh/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}