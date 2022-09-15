const express = require("express")
const cors = require("cors")
const {default: axios} = require("axios")
const app = express()
app.use(cors())
app.use(express.json())
const posts = {}
const handleEvents = (type, payload) => {
    if (type === "postCreated") {
        const { id, title } = payload
        posts[id] = { id, title, comments: [] }
    } else if (type === "commentCreated") {
        const { postId, id, content, status } = payload
        const post = posts[postId]
        post.comments.push({ id, content, status })
    } else if (type === "commentUpdated") {
        const { id, postId, status, content } = payload
        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id === id)
        comment.status = status
    }
}
app.post("/events", async (req, res) => {
    const { type, payload } = req.body

    handleEvents(type, payload)
    // console.log(posts)
    res.send({ status: "OK" })
})

app.get("/posts", (req, res) => {
    res.send({ posts })
})

app.listen(4002, async () => {
    console.log("Query Service is running on the port 4002")

    const {data} = await axios.get("http://localhost:4005/events")

    for(let event of data){
        console.log("processing event", event.type);

        handleEvents(event.type, event.payload)
    }
})