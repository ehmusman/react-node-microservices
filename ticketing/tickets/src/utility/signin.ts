import request from "supertest"
import { app } from "../app";
import jwt from "jsonwebtoken";
import { generateMongoId } from "./mongo";
export default function () {
    //Build a JWT Payload
    const payload = {
        id: generateMongoId(),
        email: "ehmusman@gmail.com"
    }
    // Create JWT 
    const token = jwt.sign(payload , process.env.JWT_KEY!)

    // Build a session Object
    const session = {jwt: token}

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session)

    // Take JSON and encode it ad base64

    const base64 = Buffer.from(sessionJSON).toString("base64")

    return [`_gid=GA1.2.1648928320.1667201452; _gat=1; _ga_34B604LFFQ=GS1.1.1667305770.11.1.1667308289.59.0.0; _ga=GA1.2.1207973956.1666987305; session=${base64}`]
} 