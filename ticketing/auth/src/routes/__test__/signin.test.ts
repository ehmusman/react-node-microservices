import request from "supertest"
import { app } from "../../app"

it("should returns a status 400 by signin with an email that is not registered", async () => {
    return request(app)
        .post("/api/users/signin")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(400)
})

it("should returns a status 200 by signin with an email that is registered", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(201)
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(200)
})

it("should returns a status 400 by signin with an email and wrong password", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(201)
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "ehmusman@gmail.com",
            password: "passq"
        })
        .expect(400)
})

it("should returns a status 200 by signin with an email and password", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(201)
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(200)
})

it("should returns a cookie when the ccredentials are valid", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(201)
    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(200)
    expect(response.get('Set-Cookie')).toBeDefined()
})