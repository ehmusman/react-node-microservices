import express, { Request, Response , NextFunction} from "express";
import { body } from "express-validator"
import jwt from "jsonwebtoken"
import { BadRequestError } from "../errors/badRequestError";
import { User } from "../models/user";
import { validateRequest } from "../middlewares/validateRequests";

const router = express.Router()

router.post("/signup", [
    body("email").isEmail().withMessage("Email must be a valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")
], validateRequest,  async (req: Request, res: Response, next: NextFunction) => {        
        const { email, password } = req.body
        
        // find if user with same email already exists or not?
        const existingUser = await User.findOne({email})
        if(existingUser){
           throw new BadRequestError("Email already in use...")
        }
        const user = User.build({email, password})
        console.log("Creatig User....")
        await user.save()
        // Generate JWT
        const userJWT = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_KEY!)
        // Store it on session object
        req.session= {
            jwt: userJWT
        }

        res.status(201).send(user)
})

router.get("/signup", (req,res) => {
    res.send("jiiiiiii")
})
export default router