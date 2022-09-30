import express from "express";


const router = express.Router()

router.post("/signout", async (req, res) => {
    res.send("hi there!!!!")
})

export default router