import { Router } from "express";
const router = Router();
import { UserRegiser } from "../controllers/user.controller.js";


console.log("hello");

router.post("/register",UserRegiser)





export default router