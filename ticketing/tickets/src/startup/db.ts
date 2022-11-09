import mongoose from "mongoose"
import { natsWrapper } from "../natsWrapper"

export default async function () {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined")
    }
    if (!process.env.NATS_URL){
        throw new Error("NATS_URL must be defined")
    }
    try {
        await natsWrapper.connect('ticketing', 'clientId', process.env.NATS_URL)
        natsWrapper.client.on("close", () => {
            console.log("NATS connection closed!")
            process.exit()
        })

        process.on("SIGINT", () => natsWrapper.client.close())
        process.on("SIGTERM", () => natsWrapper.client.close())
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB Ticketing DB")
    } catch (error) {
        console.error(error)
    }
}