import jwt from "jsonwebtoken";
import User from "../models/users.models.js";

const VerifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.acessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    
      // console.log(token);
      

      
      if (!token) {
        res.json({
          message: "Unauthorized request",
        });
        return;
      }
      
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      
      console.log(decodedToken._id);
      const user = await User.findById(decodedToken?._id);
      
    
     
    if (!user) {
      res.status(400).json({
        message: "Invalid Acess Token",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid acess token",
    });
  }
};

export default VerifyJWT;
