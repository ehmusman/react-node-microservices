import { Express } from "express"
import { errorHandler, NotFoundError } from "@usman-bakhsh/common"
import newRoutes from "../routes/new"
import showTicketRouter from "../routes/show"
import indexTicketRouter from "../routes/index"
import updateTicketRouter from "../routes/update"
export default function(app: Express){
    app.use("/api/tickets", newRoutes)
    app.use("/api/tickets", showTicketRouter)
    app.use("/api/tickets", indexTicketRouter)
    app.use("/api/tickets", updateTicketRouter)
    app.all("*", async (req,res) => {
        throw new NotFoundError()
    })
    app.use(errorHandler)

}