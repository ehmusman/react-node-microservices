import { Express } from "express"
import { errorHandler, NotFoundError } from "@usman-bakhsh/common"

export default function(app: Express){
    app.all("*", async (req,res) => {
        throw new NotFoundError()
    })
    app.use(errorHandler)

}