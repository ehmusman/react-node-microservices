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


app.post("/posts", async (req, res) => {
    const { title } = req.body
    const id = randomBytes(4).toString("hex")
    const post = { id, title }
    posts.push(post)

    await axios.post("http://localhost:4005/events", {
        type: "postCreated",
        payload: post
    })
    res.status(201).send(post)
})

app.post("/events", (req, res) => {
    const { type, payload } = req.body
    if (type === "postCreated") {
    }
    res.send({ status: "OK" })
})
app.listen(4000, () => {
    console.log("App is listening on Port 4000")
})