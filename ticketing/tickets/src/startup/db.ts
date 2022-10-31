import mongoose from "mongoose"

export default async function () {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined")
    }
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to DB Ticketing DB")
    } catch (error) {
        console.error(error)
    }
}