import { Express } from "express"
import currrentUserRouter from "../routes/currentUser"
import signinRouter from "../routes/signin"
import signoutRouter from "../routes/signout"
import signupRouter from "../routes/signup"
import { errorHandler, NotFoundError } from "@usman-bakhsh/common"

export default function(app: Express){
    app.use("/api/users", currrentUserRouter)
    app.use("/api/users", signinRouter)
    app.use("/api/users", signoutRouter)
    app.use("/api/users", signupRouter)
    app.all("*", async (req,res) => {
        throw new NotFoundError()
    })
    app.use(errorHandler)

}