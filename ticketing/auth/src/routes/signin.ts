import express, {Request, Response} from "express";
import { body} from "express-validator"
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@usman-bakhsh/common";
import { User } from "../models/user";
import { Password } from "../services/password";
const router = express.Router()

router.post("/signin",[
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You must supply a password")
], validateRequest ,async (req: Request, res: Response) => {
    const {email, password} = req.body
    const existingUser = await User.findOne({email})
    if(!existingUser){
        throw new BadRequestError("Invalid Credentials")
    }
    const passwordMatch = await Password.compare(existingUser.password, password)

    if(!passwordMatch){
        throw new BadRequestError("Invalid Credentials")
    }

    // Generate JWT
    const userJWT = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!)
    // Store it on session object
    req.session = {
        jwt: userJWT
    }
    res.send(existingUser)
})

export default router