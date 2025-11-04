import User from "../models/users.models.js"

//make user login 
//hwo to login
//take iput username, password ,email,fullname,bio,profile picture, 
//first take inputes from the 
/*
input datat
1. username , password , email , fullname ,bio ,profile picture
1.1 after check wherter any user with this email or id exist or not 
2. hash the password 
3. upload image to the cloudinary 
4. upload these data into the mongodb
5. give response to the user with logined values 




*/
const UserRegiser = async (req,res)=>{

const {username,email,password,fullname,bio} = req.body

if(!username || !email || !password || !fullname )
{
    res.status(400).json({
        message:"please insert all values"
    })
}

const existUser = await User.findOne({
    $or:[{username},{email}],
})

if(existUser){
    res.status(409).json({
        message:"this user exist already"
    })
}

const avatarlocalpath = req.files

console.log(avatarlocalpath);




}




export {UserRegiser}