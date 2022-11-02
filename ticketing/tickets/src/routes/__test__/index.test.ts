import request from "supertest"
import { app } from "../../app"
import signin from "../../utility/signin"
import crypto  from "crypto";
import {Ticket} from "../../models/ticket"

async function createTickets() {
    var title = crypto.randomBytes(20).toString('hex');
    return await request(app)
        .post("/api/tickets")
        .set("Cookie", signin())
        .send({
            title,
            price: 10 * Math.random()
        })
}
it("SHould fetch a list of tickets", async () => {
    await createTickets();
    await createTickets();
    await createTickets();
    const tickets = await request(app)
    .get("/api/tickets")
    .send({});
    expect(tickets.body.length).toEqual(3)

})