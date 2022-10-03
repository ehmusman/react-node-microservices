import express from "express"
import "express-async-errors"
import routers from "./startup/routes"
import connectDb from "./startup/db"
const app = express()
app.use(express.json())
// routes
routers(app)

connectDb()
app.listen(3000, () =>{
    console.log("Listening on port 3000!!!!!!");
}) 