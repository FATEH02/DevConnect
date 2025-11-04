import mongoose from "mongoose";
import { MONGODBNAME } from "../constant.js";


//coonnect to mongodb using mongoose

const ConnectDb = async()=>{
   
    try {
        console.log(MONGODBNAME);
        
        const connectionoutput = await mongoose.connect(`${process.env.MONGODB_URL}/${MONGODBNAME}`)//dpurl+databasename

        console.log(`\n mongodb connected !! DB HOST ${connectionoutput.connection.host}`);
       
        
    } catch (error) {
        console.log("Db Not able to connect some error occured->",error);
         process.exit(1)
    }
}

export default ConnectDb