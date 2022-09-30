import express, { Request, Response , NextFunction} from "express";
import { body, validationResult } from "express-validator"
import { RequestValidationError } from "../errors/requestValidationError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";

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
        
        console.log("Creatig User....")
        // throw new Error("Error cnnecting to database")
        throw new DatabaseConnectionError()
        res.send({ email, password })
})

export default router