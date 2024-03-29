import express,{Request, Response} from "express"
import {requireAuth, validateRequest} from "@usman-bakhsh/common"
import {body} from "express-validator"
import {Ticket} from "../models/ticket"
import { TicketCreatedPublisher } from "../events/publishers/ticketCreatedPublisher"
import { natsWrapper } from "../natsWrapper"
const router = express.Router()

router.post("/",[
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({gt: 0}).withMessage("Price must be greater than 0")
], validateRequest, requireAuth, async(req: Request,res:Response) =>{

    let {title, price} = req.body

    const ticket = Ticket.build({
        title, price, userId: req.currentUser!.id
    })
    await ticket.save()
    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title, 
        price: ticket.price,
        userId: ticket.userId
    })
    res.status(201).send(ticket)
})

export default router