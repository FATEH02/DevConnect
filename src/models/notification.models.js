import mongoose from "mongoose";


const NotificationSchema = new mongoose.Schema({
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        types:String,
        enum:["like","comment","follow","mention"],
        required:true
    },
    entityId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    isread:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Notification = mongoose.model("Notification",NotificationSchema)

export default Notification