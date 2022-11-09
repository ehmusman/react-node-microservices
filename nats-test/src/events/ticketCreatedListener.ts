import {Message, Stan} from "node-nats-streaming"
import {Listener} from "./baseListener"
import { TicketCreatedEvent } from "./ticketCreatedEvents";
import { Subjects } from "./subjects";
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = "payments-service";
    onMessage(data: TicketCreatedEvent["data"], msg: Message) {
        console.log(data)
        msg.ack()
    }
}