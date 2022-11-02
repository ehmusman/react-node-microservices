import request from "supertest"
import { app } from "../../app"
import {Ticket} from "../../models/ticket"
import signin from "../../utility/signin"
import mongoose from "mongoose"
import { generateMongoId } from "../../utility/mongo"
// simple ticket update test

// it("should update the ticket", async () => {

    // let [title, price] = ["title", 10]
    // const ticket = await request(app)
    // .post("/api/tickets")
    // .set("Cookie", signin())
    // .send({title, price})
    // .expect(201);

    // let [updatedTitle, updatedPrice] = ["title1", 10]
    // const updatedTicket = await request(app)
    // .put(`/api/tickets/${ticket.body.id}`)
    // .set("Cookie", signin())
    // .send({title: updatedTitle, price: updatedPrice});

    // expect(updatedTicket.status).toEqual(200)
    // expect(updatedTicket.body.title).toEqual(updatedTitle)
    // expect(updatedTicket.body.price).toEqual(updatedPrice)
// })

it("should returns a 401 if the user is not authenticated", async () => {
    const id = generateMongoId()

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: "ticket title",
            price: 20
        }).expect(401)

})
it("should returns a 404 if the provided id does not exist", async () => {
    const id = generateMongoId()
    await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signin())
    .send({
        title: "ticket title",
        price: 20
    }).expect(404)
})
it("should returns a 401 if the user does not own the ticket", async () => { 

    let [title, price] = ["title", 10]
    const ticket = await request(app)
        .post("/api/tickets")
        .set("Cookie", signin())
        .send({ title, price })
        .expect(201);

    let [updatedTitle, updatedPrice] = ["title1", 10]
    const updatedTicket = await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", signin())
        .send({ title: updatedTitle, price: updatedPrice });

    expect(updatedTicket.status).toEqual(401)
    // expect(updatedTicket.body.title).toEqual(updatedTitle)
    // expect(updatedTicket.body.price).toEqual(updatedPrice)
})
it("should returns a 400 if the user provides an invalid title and price", async () => { 
    let [title, price] = ["title", 10]
    // creating instance of the cookie so that we can pretend same user is requesting again
    const cookie = signin()
    const ticket = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({ title, price })
        .expect(201);

    let [updatedTitle, updatedPrice] = ["title1", -10]
    const updatedTicket = await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set("Cookie", cookie)
        .send({ title: updatedTitle, price: updatedPrice });

    expect(updatedTicket.status).toEqual(400)
})

it("should returns a 200 if the user updated ticket succssfully", async () => {
    let [title, price] = ["title", 10]
    // creating instance of the cookie so that we can pretend same user is requesting again
    const cookie = signin()
    const ticketResponse = await request(app)
        .post("/api/tickets")
        .set("Cookie", cookie)
        .send({ title, price })
        .expect(201);

        let [updatedTitle, updatedPrice] = ["title1", 10]
    await request(app)
        .put(`/api/tickets/${ticketResponse.body.id}`)
        .set("Cookie", cookie)
        .send({ title: updatedTitle, price: updatedPrice })
        .expect(200);

    const checkUpdate = await request(app)
    .get(`/api/tickets/${ticketResponse.body.id}`)
    .expect(200)
    expect(checkUpdate.body.title).toEqual(updatedTitle)
    expect(checkUpdate.body.price).toEqual(updatedPrice)
})