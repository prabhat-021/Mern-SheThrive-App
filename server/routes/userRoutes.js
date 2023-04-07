import express from "express";
import { signIn, signUp } from "../Controllers/userControllers.js";

const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUn", signUp);


export default router;
