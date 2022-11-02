import express,{ Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@usman-bakhsh/common";
const router = express.Router()
router.get("/", async(req: Request, res: Response) => {
    const tickets = await Ticket.find({})
    if(tickets.length === 0) {
        throw new NotFoundError()
    }
    res.status(200).send(tickets)
})
export default router