import mongoose, { mongo } from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        requried:true,
        lowercase:true,
    },
    seen:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})

const Message = mongoose.model("Message",MessageSchema)

export default Message