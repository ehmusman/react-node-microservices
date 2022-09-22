const express = require("express")
const axios = require("axios")
const app = express()
const { randomBytes } = require("crypto")

app.use(express.json())
const cors = require("cors")
app.use(cors())
const commentsByPostId = {}

app.get("/posts/:id/comments", (req, res) => {
    const { id: postId } = req.params
    const comments = commentsByPostId[postId] || []
    res.send(comments)
})


app.post("/posts/:id/comments", async (req, res) => {
try {
    const { content } = req.body
    const { id: postId } = req.params
    const id = randomBytes(4).toString("hex")
    const comments = commentsByPostId[postId] || []
    const comment = { postId, id, content, status: 'pending' }
    comments.push(comment)
    commentsByPostId[postId] = comments
    await axios.post("http://event-bus-srv:4005/events", {
        type: "commentCreated",
        payload: comment
    })
    res.status(201).send(comment)
} catch (error) {
    console.log("comment creating error", error);
    res.status(400).send("comment creating error")
}
})

app.post("/events", async (req, res) => {
    const { type, payload } = req.body
    if (type === "commentCreated") {
    }
    if (type === "commentModerated"){
        const { id,postId,status,content } = payload
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment => comment.id === id)
        comment.status = status

        // comment is update, spreading this event to all the services
        await axios.post("http://event-bus-srv:4005/events", {
            type: "commentUpdated",
            payload: {id, postId, status,content}
        })
    }
    res.send({ status: "OK" })
})

app.listen(4001, () => {
    console.log("App is listening on Port 4001")
})