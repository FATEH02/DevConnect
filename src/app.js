//this file is for configuring app js
import express, { json, urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/users.routes.js";
const app = express();

const port = process.env.PORT||3000;

//so backend can acess frontend url 
app.use(cors({
    origin:process.env.CORS_ORIGIN,

}))
app.use(json({}))//tels express parsse json data also 

app.use(urlencoded())//urlencoded to parser the urlenced files
app.use(cookieParser())//to parser cookies
app.use(express.static("public"))
app.use("/api/v1/users",userRouter)

//this all was setup now i will start the ap 




export {app}











