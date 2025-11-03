import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index:true//make it searchable
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase:true,
      trim:true
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim:true,
      index:true
    },
    bio: {
      type: String,
      default: "enter bio",
    },
    profilepicture: {
      type: String,
      required:true
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

//wrting custome methods for authetications 
//pre save hook 
UserSchema.pre('save',function(){

})




const User = mongoose.model("User",UserSchema);
export default User

