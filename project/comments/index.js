const express = require("express")
const axios = require("axios")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())
const commentsByPostId = []

app.get("/posts/:id/comments", (req, res) => {
    const { id: postId } = req.params
    const comments = commentsByPostId.filter(post => post.postId === postId) || []
    res.send(comments)
})


app.post("/posts/:id/comments", async (req, res) => {
    const { content } = req.body
    const { id: postId } = req.params
    const comment = { postId, id: Math.round(Math.random() * 123123123 / 23), content }
    commentsByPostId.push(comment)

    await axios.post("http://localhost:4005/events", {
        type: "commentCreated",
        payload: comment
    })
    res.status(201).send(comment)
})

app.post("/events", (req, res) => {
    const { type, payload } = req.body
    if (type === "commentCreated") {
        console.log(type, payload)
    }
    res.send({ status: "OK" })
})

app.listen(4001, () => {
    console.log("App is listening on Port 4001")
})