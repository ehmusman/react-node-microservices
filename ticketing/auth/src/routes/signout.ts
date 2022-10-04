import express from "express";
const router = express.Router()

router.post("/signout", async (req, res) => {
    req.session = null
    res.send({})
})

export default router