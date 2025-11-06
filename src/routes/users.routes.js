import { Router } from "express";
const router = Router();
import { UserRegiser , UserLogin , Logout } from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js"
import VerifyJWT from "../middleware/verifyJWT.middleware.js";

console.log("hello");

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
    ])
    ,UserRegiser)

router.route("/login").post(UserLogin)

router.route("/logout").post(VerifyJWT,Logout)



export default router