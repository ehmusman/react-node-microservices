import express, {Request, Response} from "express";
import { currentUser } from "../middlewares/currentUser";
const router = express.Router()

router.get("/currentuser", currentUser, async(req: Request,res: Response) => {
   res.send({currentUser: req.currentUser || null})
})

export default router