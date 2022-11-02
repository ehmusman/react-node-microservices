import express from "express"
import "express-async-errors"
import routers from "./startup/routes"
import cookieSession from "cookie-session"
import dotenv from "dotenv"
import {currentUser} from "@usman-bakhsh/common"
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
app.use(currentUser)
// routes
routers(app)

export {app}