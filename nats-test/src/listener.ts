import nats from "node-nats-streaming"
import {randomBytes} from "crypto"
import {TicketCreatedListener} from "./events/ticketCreatedListener"
console.clear()
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: "http://localhost:4222"
})

stan.on("connect", () => {
    console.log("Listener is connected to NATS")

    stan.on("close", () => {
        console.log("NATS connection closed!")
        process.exit()
    })
    // this option is used for multiple purposes
    // like to deal with the missing event.
    // for example an event has a very important data while processing that event may b the db connection is lost and we'll lose that event. we have to make it sure to process that event after that.
    /////////////////////////////////////////////////////////////////////////////////////////
    // const options = stan.subscriptionOptions()
    // .setManualAckMode(true)
    // .setDeliverAllAvailable()
    // .setDurableName("accounting-service")
    // const subscription = stan.subscribe(
    //     "ticket:created",
    //     "order-service-queue-group",
    //     options)
    // subscription.on("message", (msg: Message) => {
    //     const data = msg.getData()
    //     if(typeof data === "string"){
    //         console.log(`Received Event #${msg.getSequence()}, with data:${data}`)
    //     }
    //     msg.ack()
    // })
    /////////////////////////////////////////////////////////////////////////////////////////

    new TicketCreatedListener(stan).listen()
})

process.on("SIGINT", () => stan.close())
process.on("SIGTERM", () => stan.close())




