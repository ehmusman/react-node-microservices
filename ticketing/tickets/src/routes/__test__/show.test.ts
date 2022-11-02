import request from "supertest"
import { app } from "../../app"
import signin from "../../utility/signin"
import mongoose from "mongoose"
it("Should return 404 if the ticket is not found", async()=> {
    const id = new mongoose.Types.ObjectId().toHexString()
    const response = await request(app)
    .get(`/api/tickets/${id}`)
    .send({})
    .expect(404)

    console.log(response.body)
})

it("Should returns the ticket if the ticket is found", async () => {
    const [title, price] = ["title", 20]
    const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({title, price})
    .expect(201);

    const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({})
    .expect(200);
    
    expect(ticketResponse.body.title).toEqual(title)
    expect(ticketResponse.body.id).toEqual(response.body.id)
    expect(ticketResponse.body.price).toEqual(price)
})