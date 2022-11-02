import express,{Request, Response} from "express"
import { Ticket } from "../models/ticket"
import {NotFoundError} from "@usman-bakhsh/common"
const router = express.Router()

router.get("/:id", async (req,res) => {
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket) {
        throw new NotFoundError()
    }

    res.status(200).send(ticket)
})
export default router