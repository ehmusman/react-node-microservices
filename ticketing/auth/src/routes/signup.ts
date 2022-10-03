import express, { Request, Response , NextFunction} from "express";
import { body, validationResult } from "express-validator"
import { BadRequestError } from "../errors/badRequestError";
import { RequestValidationError } from "../errors/requestValidationError";
import { User } from "../models/user";
const router = express.Router()

router.post("/signup", [
    body("email").isEmail().withMessage("Email must be a valid"),
    body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")
], async (req: Request, res: Response, next: NextFunction) => {        
        const errors: any = validationResult(req)
        if (!errors.isEmpty()) {
            // return res.status(400).send(errors.array())
            // throw new Error(errors.array()[0].msg)
            throw new RequestValidationError(errors.array())
        }
        const { email, password } = req.body
        
        // find if user with same email already exists or not?
        const existingUser = await User.findOne({email})
        if(existingUser){
           throw new BadRequestError("Email already in use...")
        }
        const user = User.build({email, password})
        console.log("Creatig User....")
        await user.save()
        // throw new Error("Error cnnecting to database")
        res.status(201).send(user)
})

export default router