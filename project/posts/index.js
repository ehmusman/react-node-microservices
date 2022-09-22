const express = require("express")
const cors = require("cors")
const { randomBytes } = require("crypto")
const app = express()
const axios = require("axios")
app.use(cors())
app.use(express.json())
const posts = []

app.get("/posts", (req, res) => {
    res.send(posts)
})


app.post("/posts/create", async (req, res) => {
try {
    const { title } = req.body
    const id = randomBytes(4).toString("hex")
    const post = { id, title }
    posts.push(post)

    await axios.post("http://event-bus-srv:4005/events", {
        type: "postCreated",
        payload: post
    })
    res.status(201).send(post)
} catch (error) {
    console.log("post create error = ", error);
    res.status(400).send("something went wrong")
}
})

app.post("/events", (req, res) => {
    const { type, payload } = req.body
    if (type === "postCreated") {
    }
    res.send({ status: "OK" })
})
app.listen(4000, () => {
    console.log("this is version 60");
    console.log("App is listening on Port 4000")
})