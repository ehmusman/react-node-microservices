const express = require("express")
const app = express()
const cors = require("cors")
const axios = require("axios")

app.use(express.json())
app.use(cors())


const events = []
app.post("/events", (req, res) => {
    const event = req.body
    console.log("Received Event = ", event)
    events.push(event)
    axios.post("http://posts-clusterip-srv:4000/events", event)
    axios.post("http://comments-srv:4001/events", event)
    axios.post("http://query-srv:4002/events", event)
    axios.post("http://moderation-srv:4003/events", event)

    res.send({ status: "OK" })
})

app.get("/events", (req,res) => {
    res.send(events)
})

app.listen(4005, () => console.log("Event Bus Server is listening on the port 4005"))