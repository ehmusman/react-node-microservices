const { v4: uuid }  =  require('uuid');

const express = require("express")
const cors= require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const posts = []

app.get("/posts", (req,res) => {
    res.send(posts)
})


app.post("/posts", (req,res) => {
    const {title} = req.body
    const post = {id: uuid(), title}
    posts.push(post)

    res.status(201).send(post)
})

app.listen(4000, () => {
    console.log("App is listening on Port 4000")
})