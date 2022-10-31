import connectDb from "./startup/db"
import {app} from "./app"
connectDb()
app.listen(3000, () =>{
    console.log("Listening on port 3000!!!!!!");
}) 