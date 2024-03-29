import express, {Request, Response} from "express"
import { Ticket } from "../models/ticket"
import {body} from "express-validator"
import { NotFoundError, requireAuth, NotAuthorizedError, validateRequest } from "@usman-bakhsh/common"
import { TicketUpdatedPublisher } from "../events/publishers/ticketUpdatedPublisher"
import { natsWrapper } from "../natsWrapper"

const router = express.Router()

router.put("/:id",requireAuth,[
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
],validateRequest, async(req: Request,res: Response) => {
    const {id} = req.params
    const {title, price} = req.body
    // find Ticket By Id
    let ticket = await Ticket.findById(id)
    if(!ticket){
        throw new NotFoundError()
    }
    if(ticket.userId !== req.currentUser!.id){
        throw new NotAuthorizedError()
    }
    ticket.set({title, price})

    await ticket.save()
    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
    })
    res.status(200).send(ticket)

})


export default router