import express, {Request, Response} from "express";
import { currentUser } from "@usman-bakhsh/common";
const router = express.Router()

router.get("/currentuser", currentUser, async(req: Request,res: Response) => {
   res.send({currentUser: req.currentUser || null})
})

export default router