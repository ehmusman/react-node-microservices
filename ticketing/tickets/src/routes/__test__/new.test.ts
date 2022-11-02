import request from "supertest"

import { app } from "../../app"
import signin from "../../utility/signin"
import {Ticket} from "../../models/ticket"

it('has a route handler listening to /api/tickets for post request', async () => {
    const response = await request(app)
    .post("/api/tickets")
    .send({});
    expect(response.status).not.toEqual(404)
 })
it('should be accessed if the user is signed in', async ()=>{
    await request(app)
    .post("/api/tickets")
    .send({})
    .expect(400)
})


it('should return a status other than 401 if user is signed in', async () => {

    const response = await request(app)
        .post("/api/tickets")
        .set("Cookie", signin())
        .send({});
    expect(response.status).not.toEqual(401)
})


it('should return an error if an invalid title is provided', async ()=>{
    await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
        title: "",
        price: 10
    })
    .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", signin())
        .send({
            price: 10
        })
        .expect(400)
})
it('should return an error if an invalid price is provided', async ()=>{
    await request(app)
        .post("/api/tickets")
        .set("Cookie", signin())
        .send({
            title: "1111",
            price: -10
        })
        .expect(400);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", signin())
        .send({
            title: "1111",
        })
        .expect(400)
})
it('Should create a ticket for a valid input', async ()=>{
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0);
    let title= "title"
    await request(app)
            .post("/api/tickets")
            .set("Cookie", signin())
            .send({
                title,
                price: 10
            })
            .expect(201)
    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1)
    expect(tickets[0].title).toEqual(title)
    expect(tickets[0].price).toEqual(10)
})
