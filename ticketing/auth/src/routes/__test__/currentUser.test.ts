import request from "supertest"
import { app } from "../../app"
import signup from "../../utility/signup"
it("should respond with details about the current user", async () => {
    const cookie = await signup()

    const response = await request(app)
        .get("/api/users/currentuser")
        .set("Cookie", cookie)
        .send()
        .expect(200)
    expect(response.body.currentUser.email).toEqual("ehmusman@gmail.com")
})

it("should return null currentUser if the user is not authenticated", async () => {
    const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200)

    expect(response.body.currentUser).toBe(null)
})