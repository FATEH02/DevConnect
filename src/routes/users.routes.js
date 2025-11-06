import { Router } from "express";
const router = Router();
import { UserRegiser , UserLogin } from "../controllers/user.controller.js";
import upload from "../middleware/multer.middleware.js"

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



export default router