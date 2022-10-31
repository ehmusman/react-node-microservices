import express from "express"
import "express-async-errors"
import routers from "./startup/routes"
import cookieSession from "cookie-session"
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.set("trust proxy", true)
app.use(express.json())
// cookies-configuration
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",

    })
)

// routes
routers(app)
if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined")
}
export {app}