const express = require("express")
const cors = require("cors")
const { default: axios } = require("axios")
const app = express()
app.use(cors())
app.use(express.json())

app.post("/events", async (req, res) => {
    const {type, payload} = req.body
    if (type ==="commentCreated"){
        const { postId, id, content } = payload
        const status = content.includes("orange") ? "rejected" : "approved"

        await axios.post("http://event-bus-srv:4005/events", {
            type: "commentModerated",
            payload: {
                id,
                postId,
                status,
                content
            }
        })
    }
    res.send({})
})


app.listen(4003, () => console.log("Query Service is running on the port 4003"))