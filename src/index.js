import dotenv from "dotenv"
import mongoose from "mongoose"
import ConnectDb from "./db/Connection.js"
import { app } from "./app.js"


dotenv.config({
    path:".env"
})

const port = process.env.PORT

ConnectDb().then(()=>{
  app.listen(3000,()=>{
    console.log(`App is running on ${port}`)
  })
}).catch((err)=>{
  console.log("some erro occured during connecting db->",err);
})







