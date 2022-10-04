import express from "express"
import "express-async-errors"
import routers from "./startup/routes"
import connectDb from "./startup/db"
import cookieSession from "cookie-session"

const app = express()
app.set("trust proxy", true)
app.use(express.json())
// cookies-configuration
app.use(
    cookieSession({
        signed: false,
        secure: true,

    })
)

// routes
routers(app)
if (!process.env.JWT_KEY){
    throw new Error("JWT_KEY must be defined")
}
connectDb()
app.listen(3000, () =>{
    console.log("Listening on port 3000!!!!!!");
}) 