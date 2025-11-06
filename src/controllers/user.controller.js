import User from "../models/users.models.js";
import uploadimagecloud from "../utils/cloudinary.js";
import { hashpassword, comparepassword } from "../utils/hash.js";
import { generateRefressToken, generateAccessToken } from "../utils/token.js";
import cookieParser from "cookie-parser";
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

const UserRegiser = async (req, res) => {
  //taking data from req.body
  const { username, email, password, fullname, bio } = req.body;

  //check if all values exist or not
  if (!username || !email || !password || !fullname) {
    res.status(400).json({
      message: "please insert all values",
    });
  }
  //try to found the values with username and emails
  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  //if existuser then return
  if (existUser) {
    res.status(409).json({
      message: "this user exist already",
    });
    return;
  }
  //find localpath
  const avatarLocalPath = req.files?.avatar?.[0]?.path || null;
  //   console.log(avatarLocalPath);
  //if no localpath then return
  if (!avatarLocalPath) {
    res.status(400).json({
      message: "avatar image is compulsary",
    });
    return;
  }

  const avatar = await uploadimagecloud(avatarLocalPath);

  if (!avatar) {
    res.status(400).json({
      message: "avatar image needed",
    });
    return;
  }

  const hasedpassword = await hashpassword(password);
  console.log(hasedpassword);

  const user = await User.create({
    username: username,
    email: email,
    password: hasedpassword,
    fullname: fullname,
    bio: bio,
    profilepicture: avatar.url,
  });

  const accesstoken = generateAccessToken({
    _id: user._id,
    email: user.email,
    username: user.username,
    fullname: user.fullname,
  });

  const refreshtoken = generateRefressToken({
    _id: user._id,
  });

  const ruser = await User.findOne(user._id);

  ruser.refreshtoken = refreshtoken;

  await ruser.save();

  return res.status(200).json({
    username: user.username,
    email: user.email,
    fullname: user.fullname,
    acesstoken: accesstoken,
  });
};

const UserLogin = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username);

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    res.status(400).json({
      message: "No user exist",
    });
    return;
  }

  const compare = await comparepassword(password, user.password);

  if (!compare) {
    res.status(400).json({
      message: "wrong password",
    });
    return;
  }

  const acesstoken = generateAccessToken({
    _id: user._id,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
  });
  const refreshtoken = generateRefressToken({
    id: user._id,
  });

  user.refreshtoken = refreshtoken;
  await user.save();

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("acessToken", acesstoken, options)
    .cookie("refreshToken", refreshtoken, options)
    .json({
      username: user.username,
      email: user.email,
      fullname: user.fullname,
      message: "User Logges in Sucessfully ",
    });
};

const Logout = async (req, res) => {
  console.log("helo");

  console.log(req.user);

  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      refreshtoken: undefined,
    },
  });

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("acessToken", options)
    .cookie("refreshToken", options)
    .json({
      message: "User Loged in Sucessfully ",
    });
};


export { UserRegiser, UserLogin, Logout };
