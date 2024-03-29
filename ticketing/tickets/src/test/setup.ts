import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import {app} from "../app"
import request from "supertest"


// declare global {
//     namespace NodeJS{
//         interface Global {
//             signup(): Promise<string[]>
//         }
//     }
// }

let mongo:any;
beforeAll(async () => {
    process.env.JWT_KEY="kijuhygtfrrtcyvuiokphytfr"
     mongo = await MongoMemoryServer.create()
    const mongoURI = await mongo.getUri()

    await mongoose.connect(mongoURI)
})

beforeEach(async() => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({})
    }
})

afterAll(async() => {
    await mongo.stop()
    await mongoose.connection.close()
})
