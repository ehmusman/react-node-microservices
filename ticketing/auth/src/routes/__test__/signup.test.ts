import request from "supertest"

import { app } from "../../app"

it("should returns a status 201 on successfull signup", async() =>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "ehmusman@gmail.com",
        password: "pass"
    })
    .expect(201)
})

it("should returns a status 400 with an invalid email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmailcom",
            password: "pass"
        })
        .expect(400)
})

it("should returns a status 400 with an invalid password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmail.com",
            password: "q"
        })
        .expect(400)
})

it("should returns a status 400 with missing email and password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "",
            password: ""
        })
        .expect(400)
})

it("should disallow duplicate emails", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(201)
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(400)
})

it("Should sets a cookie after successfull signup", async() => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "ehmusman@gmail.com",
            password: "pass"
        })
        .expect(201)
        expect(response.get('Set-Cookie')).toBeDefined()
})