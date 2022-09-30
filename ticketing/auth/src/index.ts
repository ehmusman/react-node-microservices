import express from "express"
import "express-async-errors"
import routers from "./startup/routes"
const app = express()
app.use(express.json())
// routes
routers(app)

app.listen(3000, () =>{
    console.log("Listening on port 3000!!!!!!");
}) 