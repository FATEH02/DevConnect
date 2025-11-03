import mongoose, { mongo } from "mongoose";


const PostSchema = new mongoose.Schema(
    {
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        content:{
            type:String,
            required:true,            
        },
        image:{
            type:String
        },
        likes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ],
        commentcount:{
            type:Number,
            default:0
        }
    },
    {
        timestamps:true
    }
)



const Post = mongoose.model("Post",PostSchema)

export default Post