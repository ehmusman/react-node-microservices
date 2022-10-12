import request from "supertest"
import { app } from "../app";
export default async function () {
    const email = "ehmusman@gmail.com"
    const password = "123456"

    const response = await request(app)
        .post("/api/users/signup")
        .send({ email, password })
        .expect(201);
    const cookie = response.get("Set-Cookie")

    return cookie
} 