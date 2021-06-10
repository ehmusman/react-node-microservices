const { v4: uuid }  =  require('uuid');

const express = require("express")

const app = express()
app.use(express.json())
const cors= require("cors")
app.use(cors())
const commentsByPostId = []

app.get("/posts/:id/comments", (req,res) => {
    const {id: postId} = req.params
    const comments = commentsByPostId.filter(post => post.postId === postId) || []
    res.send(comments)
})


app.post("/posts/:id/comments", (req,res) => {
    const {content} = req.body
    const {id: postId} = req.params
    const comment = {postId, id: uuid(), content}
    commentsByPostId.push(comment)
    res.status(201).send(comment)
})

app.listen(4001, () => {
    console.log("App is listening on Port 4001")
})