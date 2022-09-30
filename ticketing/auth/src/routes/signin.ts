import express from "express";


const router = express.Router()

router.post("/signin", async (req, res) => {
    res.send("hi there!!!!")
})

export default router