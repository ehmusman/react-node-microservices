import express from "express";


const router = express.Router()

router.get("/currentuser", async(req,res) => {
    res.send("hi there!!!!")
})

export default router