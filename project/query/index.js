const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

const posts = {}
app.post("/events", async (req, res) => {
    const { type, payload } = req.body

    if (type === "postCreated") {
        const { id, title } = payload
        posts[id] = { id, title, comments: [] }
    }
    if (type === "commentCreated") {
        const { postId, id, content } = payload
        const post = posts[postId]
        post.comments.push({ id, content })
    }
    console.log(posts)
    res.send({ status: "OK" })
})

app.get("/posts", (req, res) => {
    res.send({ posts })
})

app.listen(4002, () => console.log("Query Service is running on the port 4002"))